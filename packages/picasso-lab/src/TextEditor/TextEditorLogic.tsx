// import React from 'react'
// import Quill from 'quill'

// import useToolbarState from './hooks/useTextEditorState'
// import { ActionCreatorsType, ToolbarStateType, SharedState } from './types'
// import { TextEditorProps } from './index'
// import useToolbar from './hooks/useToolbar'
// import useHasFocus from './hooks/useHasFocus'
// import useDisabledEditor from '../QuillEditor/hooks/useDisabledEditor'
// import useAutofocus from '../QuillEditor/hooks/useAutofocus'

// import useOnChange from './hooks/useOnChangeCallback'

// type QuillAndToolbarStateType = {
//   children: (props: {
//     quill: Quill | undefined
//     actions: ActionCreatorsType
//     toolbarState: ToolbarStateType
//   }) => JSX.Element | null
//   id: TextEditorProps['id']
//   placeholder: TextEditorProps['placeholder']
// }


// type QuillLogicType = {
//   actions: ActionCreatorsType
//   toolbarState: ToolbarStateType
//   autofocus: TextEditorProps['autofocus']
//   disabled: TextEditorProps['disabled']
//   onChange: TextEditorProps['onChange']
//   children: (props: {
//     isToolbarDisabled: SharedState['isToolbarDisabled']
//     toolbarHandlers: SharedState['toolbarHandlers']
//   }) => JSX.Element
//   quill: Quill
// }

// const QuillLogic = ({
//   actions,
//   autofocus,
//   disabled,
//   children,
//   onChange,
//   quill,
//   toolbarState
// }: QuillLogicType) => {





//   useOnChange({ quill, onChange })

//   // connect quill with custom toolbar
//   const { toolbarHandlers } = useToolbar({
//     quill,
//     toolbarState,
//     actions
//   })

//   return <>{children({ toolbarHandlers, isToolbarDisabled: !hasFocus })}</>
// }

// type Props = {
//   autofocus: TextEditorProps['autofocus']
//   disabled: TextEditorProps['disabled']
//   id: TextEditorProps['id']
//   onChange: TextEditorProps['onChange']
//   placeholder: TextEditorProps['placeholder']
//   children: (props: SharedState) => JSX.Element
// }

// const TextEditorLogic = ({
//   autofocus,
//   disabled,
//   id,
//   onChange,
//   placeholder,
//   children
// }: Props) => {
//   return (
//     <QuillAndToolbarState id={id} placeholder={placeholder}>
//       {({ quill, actions, toolbarState }) => {
//         if (!quill) {
//           return null
//         }

//         return (
//           <QuillLogic
//             actions={actions}
//             autofocus={autofocus}
//             disabled={disabled}
//             onChange={onChange}
//             quill={quill}
//             toolbarState={toolbarState}
//           >
//             {({ toolbarHandlers, isToolbarDisabled }) => (
//               <>
//                 {children({
//                   toolbarHandlers,
//                   toolbarState,
//                   isToolbarDisabled
//                 })}
//               </>
//             )}
//           </QuillLogic>
//         )
//       }}
//     </QuillAndToolbarState>
//   )
// }

// export default TextEditorLogic
