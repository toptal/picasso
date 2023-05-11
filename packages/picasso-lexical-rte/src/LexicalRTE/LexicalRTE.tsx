import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { EditorState, EditorThemeClasses } from 'lexical';
import { $getRoot, $getSelection } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HeadingNode } from '@lexical/rich-text'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListItemNode, ListNode } from '@lexical/list'
import { LinkNode } from '@lexical/link'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import Picasso from '@toptal/picasso-provider'

import ToolbarPlugin from './plugins/ToolbarPlugin'
import styles from './styles'
import FocusPlugin from './plugins/FocusPlugin'
import validateUrl from './utils/validateUrl'

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLexicalRTE' })

const LexicalRTE = () => {
  const classes = useStyles()
  const theme: EditorThemeClasses = {
    heading: {
      h1: cx(classes['heading'], classes['heading-xlarge']),
      h2: cx(classes['heading'], classes['heading-large']),
      h3: cx(classes['heading'], classes['heading-medium']),
      h4: cx(classes['heading'], classes['heading-small']),
    },
    list: {
      nested: {
        listitem: classes['nested-list-item'],
      },
      ol: classes['list-ol'],
      ul: classes['list-ul'],
      listitem: classes['list-item'],
      listitemChecked: classes['list-item-checked'],
      listitemUnchecked: classes['list-item-unchecked'],
    },
    image: classes.image,
    link: classes.link,
    text: {
      base: classes['editor-text'],
      bold: classes['editor-bold'],
      italic: classes['editor-italic'],
      underline: classes['editor-underline'],
    },
  }

  const onError = (error: Error) => {
    console.error(error);
  }

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, selection);
    });
  }

  const initialConfig = {
    namespace: 'MyEditor', 
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode],
  };

  return (
    <Picasso>
      <div className={classes.wrapper}>
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <FocusPlugin />
          <ListPlugin />
          {/* <DefaultValuePlugin defaultValue={defaultValueInHtml} /> */}
          <LinkPlugin validateUrl={validateUrl} />
          <OnChangePlugin onChange={onChange} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className={classes.content} />
            }
            placeholder={<div>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
        </LexicalComposer>
      </div>
    </Picasso>
  );
}

export default LexicalRTE
