import React, { useMemo } from 'react'
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
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import Picasso from '@toptal/picasso-provider'

import type { EditorNodes } from './nodes/EditorNodes';
import editorNodes from './nodes/EditorNodes';
import type { Feature, Config } from './plugins/ToolbarPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import styles from './styles';
import FocusPlugin from './plugins/FocusPlugin';

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLexicalRTE' });

type Props = {
    children?: JSX.Element;
    nodes: EditorNodes;
    config?: Config;
};

const LexicalRTE = ({ children, nodes, config }: Props) => {
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
    },
    image: classes.image,
    link: classes.link,
    text: {
      base: classes['editor-text'],
      bold: classes['editor-bold'],
      italic: classes['editor-italic'],
      underline: classes['editor-underline'],
      strikethrough: 'editor-text-strike-through',
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
    nodes: [...editorNodes, ...nodes],
  };

  const toolbarFeatures = useMemo(() => {
    const features: Feature[] = [];

    if (nodes.find(({ name }) => name === 'LinkNode'))
      {features.push('link')}

    return features;
  }, [nodes.length]);

  return (
    <Picasso>
      <div className={classes.wrapper}>
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin features={toolbarFeatures} config={config} />
          <FocusPlugin />
          <ListPlugin />
          {/* <DefaultValuePlugin defaultValue={defaultValueInHtml} /> */}
          <OnChangePlugin onChange={onChange} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className={classes.content} />
            }
            placeholder={<div>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          { children ? children : <></> }
        </LexicalComposer>
      </div>
    </Picasso>
  );
}

export default LexicalRTE
