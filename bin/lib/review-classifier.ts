/* eslint-disable func-style */
/* eslint-disable id-length */
/**
 * bin/lib/review-classifier.ts
 *
 * Phase 3.4 — classifies a single PR review or comment into one of five
 * next-action categories. Pure functions; caller (orchestrator-core Phase
 * 3.5) decides what to do based on the recommendation:
 *
 *   - approval → green-light merge step
 *   - nit → fold into agent's next iteration prompt; agent edits + push
 *   - architectural → escalate to human (changes the agent's understanding
 *     of the goal, not just the code surface)
 *   - question → escalate (orchestrator can't safely answer questions
 *     about intent / scope / business decisions)
 *   - unclear → escalate (default-deny — the cost of a wrong auto-action
 *     on review feedback exceeds the cost of a human glance)
 *
 * Confidence is a sanity dial: any classification with confidence < 0.7
 * is treated as 'unclear' by the caller. We never auto-act on uncertain
 * signals.
 *
 * The classifier accepts a unified `Review` shape that's filled from
 * either gh's `reviews` field (formal reviews with APPROVED /
 * CHANGES_REQUESTED / COMMENTED state) or gh's `comments` field (issue-
 * level comments without state). State-based hints take precedence over
 * body-based heuristics: APPROVED is approval regardless of body text.
 */

export type ReviewClass =
  | 'approval'
  | 'nit'
  | 'architectural'
  | 'question'
  | 'unclear'

export interface ReviewClassification {
  class: ReviewClass
  /** 0..1; <0.7 should be treated as 'unclear' by the caller. */
  confidence: number
  reason: string
}

/**
 * Unified shape, populated from either a gh review or a gh issue comment.
 * - `state` is the review state (APPROVED / CHANGES_REQUESTED / COMMENTED)
 *   or empty/undefined for issue comments.
 * - `body` is the comment text. May be empty for an APPROVED review with
 *   no message (still counts as approval).
 */
export interface Review {
  state?: string
  body: string
  author?: string
}

const APPROVAL_PHRASES = [
  /\bLGTM\b/,
  /\b(?:looks good|looks great|looks fine)\b/i,
  /\b(?:ship\s*it|:shipit:)\b/i,
  /\bapproved?\b/i,
  /\b(?:nice|great)\s+work\b/i,
  /^\s*\+1\s*$/m,
  /^\s*👍\s*$/m,
]

const NIT_PHRASES = [
  /\bnit:?\b/i,
  /\bnitpick:?\b/i,
  /\bminor:?\b/i,
  /\b(?:could|would) you (?:please )?\b/i,
  /\bconsider\b/i,
  /\bsuggest(?:ion)?\b/i,
  /\b(?:tiny|small)\s+(?:thing|change)\b/i,
  /\bjust\s+(?:rename|fix|move|update)\b/i,
  /\bprefer\b/i,
]

const ARCHITECTURAL_PHRASES = [
  /\b(?:breaking|major)\s+change\b/i,
  /\bAPI\s+(?:change|break|surface)\b/i,
  /\b(?:rethink|reconsider|revisit)\b/i,
  /\bdesign\s+(?:concern|issue|problem)\b/i,
  /\bconcern\s+(?:about|with)\b/i,
  /\bworried\s+about\b/i,
  /\b(?:are|is)\s+(?:we|this)\s+sure\b/i,
  /\bnot\s+(?:sure|convinced)\s+(?:about|that)\b/i,
  /\b(?:scope|approach|architecture)\s+(?:change|shift|review)\b/i,
  /\bdoesn't\s+belong\b/i,
  /\bdo we\s+(?:really\s+)?need\b/i,
]

const QUESTION_PHRASES = [
  /\b(?:why|what|how|when|where|who)\s+(?:is|are|do|does|did|will|would|should)\b/i,
  /\bcan you (?:explain|clarify)\b/i,
  /\bcould you (?:explain|clarify)\b/i,
  /\bnot sure (?:why|what|how)\b/i,
  /\bdoes this\s+(?:work|handle|cover)\b.*\?/i,
]

const URL_RE = /https?:\/\/\S+/g

const SHORT_BODY_THRESHOLD = 300 // chars

function stripUrls(s: string): string {
  return s.replace(URL_RE, '')
}

function countMatches(re: RegExp, s: string): number {
  // Return number of matches; safer than s.match(re).length when re is non-global.
  const flags = re.flags.includes('g') ? re.flags : `${re.flags}g`
  const globalRe = new RegExp(re.source, flags)
  const matches = s.match(globalRe)

  return matches ? matches.length : 0
}

/**
 * Classify a review or comment. Returns an action recommendation + a
 * confidence score so the caller can default-deny on ambiguous signals.
 *
 * Decision rules (first match wins):
 *
 *   1. state === 'APPROVED' → approval (1.0). The author explicitly
 *      green-lit; body content is decoration.
 *
 *   2. state === 'CHANGES_REQUESTED' AND body contains nit-only phrases
 *      AND body length < SHORT_BODY_THRESHOLD → nit (0.85). The reviewer
 *      formally requested changes but the body is a minor request.
 *
 *   3. state === 'CHANGES_REQUESTED' default → architectural (0.9). When
 *      a reviewer formally blocks the PR, it's safest to assume they
 *      have a real concern unless the body explicitly says otherwise.
 *
 *   4. body matches APPROVAL_PHRASES (regardless of state) → approval
 *      (0.85). Common pattern: state=COMMENTED + "LGTM".
 *
 *   5. body matches ARCHITECTURAL_PHRASES → architectural (0.85).
 *      Ordered before NIT because architectural concerns can also
 *      contain words like "consider".
 *
 *   6. body matches QUESTION_PHRASES → question (0.8). A genuine
 *      question almost always needs human judgment.
 *
 *   7. body matches NIT_PHRASES AND body length < SHORT_BODY_THRESHOLD
 *      → nit (0.8). Short, suggestion-style body → likely fixable.
 *
 *   8. Default → unclear (0.4).
 */
export function classifyReview(review: Review): ReviewClassification {
  const state = (review.state ?? '').toUpperCase()
  const body = stripUrls(review.body ?? '').trim()
  const bodyShort = body.length < SHORT_BODY_THRESHOLD

  // 1. Formal approval — strongest signal.
  if (state === 'APPROVED') {
    return {
      class: 'approval',
      confidence: 1.0,
      reason: 'review state=APPROVED',
    }
  }

  // 2. Formal request-changes that's actually a nit.
  if (state === 'CHANGES_REQUESTED') {
    const isNitBody =
      bodyShort && NIT_PHRASES.some((re) => re.test(body))

    if (isNitBody) {
      return {
        class: 'nit',
        confidence: 0.85,
        reason: 'review state=CHANGES_REQUESTED with short nit-style body',
      }
    }

    // Otherwise treat as architectural — formal block on a non-trivial body.
    return {
      class: 'architectural',
      confidence: 0.9,
      reason: 'review state=CHANGES_REQUESTED with substantive body',
    }
  }

  // Body-based heuristics for COMMENTED / undefined state.
  if (!body) {
    return {
      class: 'unclear',
      confidence: 0.3,
      reason: 'empty body without explicit state',
    }
  }

  // 4. Approval phrases anywhere in body.
  if (APPROVAL_PHRASES.some((re) => re.test(body))) {
    return {
      class: 'approval',
      confidence: 0.85,
      reason: 'body matches approval phrase (LGTM / shipit / +1 / etc.)',
    }
  }

  // 5. Architectural before nit (architectural can contain "consider").
  const architecturalHits = ARCHITECTURAL_PHRASES.filter((re) =>
    re.test(body)
  ).length

  if (architecturalHits > 0) {
    return {
      class: 'architectural',
      confidence: Math.min(0.7 + architecturalHits * 0.1, 0.95),
      reason: `body matches ${architecturalHits} architectural phrase(s)`,
    }
  }

  // 6. Question phrases — count question marks too as a heuristic boost.
  const questionHits = QUESTION_PHRASES.filter((re) => re.test(body)).length
  const questionMarks = countMatches(/\?/, body)

  if (questionHits > 0 || (questionMarks >= 2 && body.length < 500)) {
    return {
      class: 'question',
      confidence: questionHits > 0 ? 0.8 : 0.7,
      reason: `body has ${questionHits} interrogative phrase(s), ${questionMarks} '?'`,
    }
  }

  // 7. Nit phrases with short body.
  if (bodyShort && NIT_PHRASES.some((re) => re.test(body))) {
    return {
      class: 'nit',
      confidence: 0.8,
      reason: 'body matches nit phrase with short length',
    }
  }

  // 8. Default — too uncertain to act on.
  return {
    class: 'unclear',
    confidence: 0.4,
    reason: `no strong signal in body (${body.length} chars)`,
  }
}

/**
 * Aggregate a batch of review classifications into a single
 * "what should the orchestrator do next?" decision.
 *
 * Rules:
 *   - Any architectural / question / unclear with confidence ≥ 0.7
 *     → escalate. Safe default: a single skeptical review blocks merge.
 *   - All low-confidence (< 0.7) → escalate (default-deny).
 *   - Any nit + no architectural/question/unclear-high → 'iterate' with
 *     the union of nit bodies as agent feedback.
 *   - All approvals → 'merge'.
 *   - Mix of approvals + nits → 'iterate' (process nits first, then re-
 *     poll for fresh approvals).
 */
export type AggregateDecision =
  | { action: 'merge'; approvals: number }
  | { action: 'iterate'; nits: readonly ReviewClassification[] }
  | { action: 'escalate'; reason: string }

export function aggregateReviewDecisions(
  classifications: readonly ReviewClassification[]
): AggregateDecision {
  if (classifications.length === 0) {
    return { action: 'escalate', reason: 'no reviews observed' }
  }

  const blockingClass = (c: ReviewClassification): boolean =>
    c.confidence >= 0.7 &&
    (c.class === 'architectural' || c.class === 'question' || c.class === 'unclear')
  const blocker = classifications.find(blockingClass)

  if (blocker) {
    return {
      action: 'escalate',
      reason: `${blocker.class} review (confidence ${blocker.confidence.toFixed(2)}): ${blocker.reason}`,
    }
  }

  // All low-confidence: default-deny.
  const allLow = classifications.every((c) => c.confidence < 0.7)

  if (allLow) {
    return {
      action: 'escalate',
      reason: `${classifications.length} reviews, all low-confidence`,
    }
  }

  const nits = classifications.filter(
    (c) => c.class === 'nit' && c.confidence >= 0.7
  )
  const approvals = classifications.filter(
    (c) => c.class === 'approval' && c.confidence >= 0.7
  ).length

  if (nits.length > 0) {
    return { action: 'iterate', nits }
  }

  if (approvals > 0) {
    return { action: 'merge', approvals }
  }

  return {
    action: 'escalate',
    reason: 'no actionable reviews after filtering',
  }
}
