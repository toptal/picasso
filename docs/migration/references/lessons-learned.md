# Migration lessons learned

Auto-accumulated by the orchestrator after each successful component migration. Each entry captures the 2–3 patterns that the agent applied, so subsequent migrations of similar components inherit hard-won knowledge.

**How this file is updated.** When the orchestrator successfully opens a PR for a component, a small post-success step (in `bin/lib/orchestrator-core.ts`) extracts the 2–3 most useful patterns from the agent's commit + asks claude to summarize them. The summary is appended to this file. Subsequent runs include this file in `migrationWorkflow.contextPack`, so the agent reads it as part of its prompt.

**How to read this.** Skim for components that share your migration shape (Tier 0 light path, Tier 1 cleanup, Tier 2 heavy, etc.). The patterns are not prescriptive — they're what worked for that specific component. Apply judgment.

**How to add manual entries.** If you discover a pattern outside an orchestrator run (e.g. while doing a manual migration takeover after escalation), append it manually using the same shape:

```markdown
## <ComponentName> — <YYYY-MM-DD>

- Tier <0–5> · target_path: `<@base-ui/react/...>` or `none` · iterations: <N>
- Pattern A: <one-line description of a non-obvious shift>
- Pattern B: <ditto>
- Pattern C (optional): <ditto>
- Reference: <PR URL or commit SHA>
```

---

<!-- Entries appended below by orchestrator. Do not delete this marker. -->
