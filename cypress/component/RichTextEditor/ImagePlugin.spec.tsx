import React, { useState } from 'react'
import type {
  RichTextEditorProps,
  UploadedImage,
} from '@toptal/picasso-rich-text-editor'
import { ImagePlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const editorTestId = 'editor'
const imageUploadButtonTestId = 'image-upload-button'
const resultContainerTestId = 'result-container'

const defaultProps = {
  id: 'foo',
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: {
    editor: editorTestId,
    imageUploadButton: imageUploadButtonTestId,
  },
}

const editorSelector = `#${defaultProps.id}`

const Editor = (props: RichTextEditorProps) => {
  const [value, setValue] = useState('')

  return (
    <Container style={{ maxWidth: '600px' }} padded={SPACING_4}>
      <RichTextEditor {...props} onChange={value => setValue(value)} />
      <Container padded={SPACING_4} data-testid={resultContainerTestId}>
        {value}
      </Container>
    </Container>
  )
}

const component = 'RichTextEditor'

const setAliases = () => {
  cy.get(editorSelector).as('editor')
  cy.getByTestId(imageUploadButtonTestId).as('imageUploadButton')
  cy.getByTestId(resultContainerTestId).as('resultContainer')
  cy.contains('placeholder').as('placeholder')
}

const getSubmitButton = () =>
  cy.get('button').contains('Confirm').closest('button')

describe('ImagePlugin', () => {
  describe('when image upload is successful', () => {
    it('inserts image into rich text editor', () => {
      const uploadedFileName = 'uploaded-image.png'
      const uploadedFileContent =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAANklEQVR42u3OMQ0AAAgDsM2/aFBBwtEqaJOZPFZBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQcEbC6LIT9nCVOrVAAAAAElFTkSuQmCC'
      const uploadedFileAltText = 'alt text'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [
              <ImagePlugin
                data-testid={imageUploadButtonTestId}
                onUpload={(file: UploadedImage) =>
                  new Promise<UploadedImage>(resolve => {
                    setTimeout(
                      () =>
                        resolve({
                          ...file,
                          url: uploadedFileContent,
                        }),
                      200
                    )
                  })
                }
              />,
            ],
          }}
        />
      )
      setAliases()

      cy.get('@editor').click()
      cy.get('@imageUploadButton').click()

      cy.getByRole('dialog').contains('No file chosen')

      getSubmitButton().should('be.disabled')

      cy.get('input[type=file]').selectFile(
        {
          contents: Cypress.Buffer.from(''),
          fileName: uploadedFileName,
        },
        { force: true }
      )

      cy.getByRole('dialog').contains('Uploading ' + uploadedFileName)
      cy.getByRole('dialog').contains(uploadedFileName)
      cy.get('[placeholder="An Image Description"]').type(uploadedFileAltText)

      getSubmitButton().should('not.be.disabled')
      getSubmitButton().click()

      cy.get('@resultContainer').contains(
        `<p><img src="${uploadedFileContent}" alt="${uploadedFileAltText}"></p>`
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'image-plugin/successful-upload',
      })
    })
  })

  describe('when image upload fails', () => {
    it('shows error', () => {
      const fileUploadErrorMessage = 'Upload failed'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [
              <ImagePlugin
                data-testid={imageUploadButtonTestId}
                onUpload={() =>
                  new Promise<UploadedImage>((resolve, reject) => {
                    setTimeout(() => reject(fileUploadErrorMessage), 200)
                  })
                }
              />,
            ],
          }}
        />
      )
      setAliases()

      cy.get('@editor').click()
      cy.get('@imageUploadButton').click()

      cy.get('input[type=file]').selectFile(
        {
          contents: Cypress.Buffer.from('file contents'),
          fileName: 'test.png',
        },
        { force: true }
      )

      cy.get('p').contains(fileUploadErrorMessage).should('be.visible')

      cy.get('[role="presentation"]').happoScreenshot({
        component,
        variant: 'image-plugin/failed-upload',
      })
    })
  })
})
