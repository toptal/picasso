import type {
  ASTType,
  RichTextEditorProps,
} from '@toptal/picasso-rich-text-editor'

// @ts-ignore 
//import { RichTextEditor as PicassoRichTextEditor } from '@toptal/picasso-rich-text-editor'
import React, { useCallback, useEffect, useState } from 'react'
import type { Except } from 'type-fest'
import { useForm } from 'react-final-form'

import type { FieldProps } from '../FieldWrapper'
import InputField from '../InputField'
import FieldLabel from '../FieldLabel'
import { useEnforceHighlightAutofill } from './hooks'

type OverriddenProps = {
  defaultValue?: ASTType
  value?: never
  initialValue?: never
}

export type Props = RichTextEditorProps &
  Except<FieldProps<string>, keyof OverriddenProps> &
  OverriddenProps

type InternalProps = RichTextEditorProps & { value: string }

export const RichTextEditor = (props: Props) => {
  const [PicassoRichTextEditor, setPicassoRichTextEditor] = useState<any>(null);
  const [attemptedToLoadRichTextEditor, setAttemptedToLoadRichTextEditor] = useState(false)
  useEffect(() => {
    async function getModule() {
      let picassoRichTextEditor
      try {
        picassoRichTextEditor = await import('@toptal/picasso-rich-text-editor')
      } catch (e) {
        console.error('@@@ error occured', e) 
      }

      setPicassoRichTextEditor(picassoRichTextEditor)
      setAttemptedToLoadRichTextEditor(true)
    }

    if (!PicassoRichTextEditor) {
      getModule()
    }
  }, []);


  console.log('@@@ PicassoRichTextEditor', PicassoRichTextEditor)


  const { onChange, onFocus, defaultValue, label, titleCase, ...rest } = props

  const { enforceHighlightAutofill, registerChangeOrFocus } =
    useEnforceHighlightAutofill()
  const [value, setValue] = useState('')
  const {
    mutators: { setHasMultilineCounter },
  } = useForm()

  // Because RichTextEditor doesn't have an value input we need to implement this
  // as an compatibility layer between final-form
  const handleOnChange = useCallback(
    (newVal: string) => {
      registerChangeOrFocus()
      setValue(newVal)
      onChange?.(newVal)
    },
    [onChange, setValue, registerChangeOrFocus]
  )

  const handleOnFocus = useCallback(() => {
    registerChangeOrFocus()

    onFocus?.()
  }, [onFocus, registerChangeOrFocus])

  const hiddenInputId = `${props.id}-hidden-input`

  if (!attemptedToLoadRichTextEditor) {
    return null
  }

  console.log('@@@ here 1', attemptedToLoadRichTextEditor, PicassoRichTextEditor)
  if (attemptedToLoadRichTextEditor && PicassoRichTextEditor === null) {
    return <div>Please install RTE as a dependency</div>
  }

  return (
    <InputField<InternalProps>
      value={value}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      label={
        label ? (
          <FieldLabel
            name={hiddenInputId}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
      setHasMultilineCounter={setHasMultilineCounter}
      {...rest}
    >
      {(inputProps: RichTextEditorProps) => (
        <PicassoRichTextEditor
          defaultValue={defaultValue}
          hiddenInputId={hiddenInputId}
          highlight={enforceHighlightAutofill ? 'autofill' : undefined}
          {...inputProps}
        />
      )}
    </InputField>
  )
}

export default RichTextEditor
