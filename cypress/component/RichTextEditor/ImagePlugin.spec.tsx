import React from 'react'
import type { UploadedImage } from '@toptal/picasso-rich-text-editor'
import { ImagePlugin } from '@toptal/picasso-rich-text-editor'

import {
  Editor,
  component,
  editorSelector,
  makeEditorProps,
  resultContainerTestId,
} from './test-helpers'

const imageUploadButtonTestId = 'image-upload-button'

const defaultProps = makeEditorProps({
  imageUploadButton: imageUploadButtonTestId,
})

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

      // let the dialog fully unmount — capturing mid-exit serializes it
      cy.getByRole('dialog').should('not.exist')

      // also let the <img> rendered in the editor decode before capturing
      cy.waitForImagesDecoded(`${editorSelector} img`)

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
      cy.get('@editor').should('be.visible')
      cy.get('@imageUploadButton').click()

      cy.get('input[type=file]').selectFile(
        {
          contents: Cypress.Buffer.from('file contents'),
          fileName: 'test.png',
        },
        { force: true }
      )

      cy.get('p').contains(fileUploadErrorMessage).should('be.visible')

      // capture body, not the dialog subtree — the modal's font-family is
      // inherited from outside the portal, so a subtree capture renders in a
      // serif fallback (the old "fonts stopped working in modals" issue)
      cy.waitForOverlayOpen()
      cy.get('body').happoScreenshot({
        component,
        variant: 'image-plugin/failed-upload',
      })
    })
  })
})
