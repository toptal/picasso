import React, { useState } from 'react'
import { Button, Modal } from '@toptal/picasso'
import { Form, FormSpy, OnChange } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'

// PF-2256 regression (staff-portal MemorandumAddModal › "verify the behaviour
// when comment is modified"). The Select's popup closes correctly when the
// selection commit opens a confirmation Modal — the Modal is incidental. What
// broke the consumer flow is a click landing on the select's field <label>
// afterwards: the browser forwards it to the associated select input as a
// synthesized activation click, which re-opened the options popup over the
// form. use-click-handler must ignore label-activation clicks. The unit-level
// guard is covered in Select.spec.tsx and the use-click-handler jest tests;
// this spec preserves the full consumer shape: picasso-forms field wiring
// (randomized `htmlFor` → input id), an OnChange listener opening a Modal,
// and the consumer's `key` remount of the Select.
const CATEGORY_OPTIONS = [
  { text: 'Talent rate', value: 'talent-rate' },
  { text: 'Engagement closed', value: 'engagement-closed' },
  { text: 'Client refund', value: 'client-refund' },
  { text: 'Debit adjustment', value: 'debit-adjustment' },
  { text: 'Credit adjustment', value: 'credit-adjustment' },
  { text: 'Write-off', value: 'write-off' },
]

const templateFor = (category: string) => `Template comment for ${category}`

const TestForm = () => {
  const [categoryId, setCategoryId] = useState('')
  const [confirmation, setConfirmation] = useState<{
    onSuccess: () => void
  } | null>(null)

  return (
    <div style={{ padding: '1rem', maxWidth: '25rem' }}>
      <Form onSubmit={noop}>
        <FormSpy subscription={{ modified: true }}>
          {({ form }) => (
            <>
              <Form.Select
                key={`${categoryId}__category`}
                enableReset
                data-testid='category'
                label='Category'
                name='categoryId'
                width='full'
                options={CATEGORY_OPTIONS}
              />
              <OnChange name='categoryId'>
                {(value: string) => {
                  setCategoryId(value)

                  if (!value) {
                    return
                  }

                  const isCommentModified =
                    form.getFieldState('comment')?.modified

                  if (isCommentModified) {
                    setConfirmation({
                      onSuccess: () => {
                        form.change('comment', templateFor(value))
                        form.resetFieldState('comment')
                        setConfirmation(null)
                      },
                    })
                  } else {
                    form.change('comment', templateFor(value))
                    form.resetFieldState('comment')
                  }
                }}
              </OnChange>
              <Form.Input
                data-testid='comment'
                label='Comment'
                multiline
                rows={5}
                name='comment'
                width='full'
              />
              <Form.Checkbox
                data-testid='notify'
                label='Send the notification'
                name='notifyReceiver'
              />
              <Modal
                open={confirmation !== null}
                onClose={() => setConfirmation(null)}
                data-testid='confirmation'
              >
                <Modal.Title>Confirm</Modal.Title>
                <Modal.Content>
                  You have manually modified the comment. Are you OK with losing
                  those changes?
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    data-testid='confirm-cancel'
                    variant='secondary'
                    onClick={() => setConfirmation(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    data-testid='confirm-yes'
                    variant='positive'
                    onClick={() => confirmation?.onSuccess()}
                  >
                    Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            </>
          )}
        </FormSpy>
      </Form>
    </div>
  )
}

describe('Form.Select whose selection opens a confirmation Modal (PF-2256)', () => {
  it('keeps the options popup closed through the confirmation and a later label click', () => {
    cy.mount(<TestForm />)

    cy.get('#comment').type('Some comment')

    cy.getByTestId('category').click()
    cy.get('[data-picasso-popper]')
      .contains('Talent rate')
      .click({ force: true })

    // the selection commit closed the popup and opened the confirmation
    cy.getByTestId('confirmation').should('be.visible')
    cy.getByTestId('confirm-yes').click()
    cy.getByTestId('confirmation').should('not.exist')

    cy.getByTestId('notify').parent().click()

    // a click on the select's field label forwards a browser-synthesized
    // activation click to the (remounted) select input — it must focus the
    // select but NOT re-open the options popup
    cy.contains('label', 'Category').click()

    cy.get('[data-picasso-popper]').should('not.exist')
    cy.getByTestId('comment').find('textarea, input').first().clear()
    cy.getByTestId('comment')
      .find('textarea, input')
      .first()
      .type('Another comment')
  })
})
