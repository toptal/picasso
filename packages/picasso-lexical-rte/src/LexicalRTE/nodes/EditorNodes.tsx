/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {Klass, LexicalNode} from 'lexical';

import {AutoLinkNode, LinkNode} from '@lexical/link';
import {ListItemNode, ListNode} from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
// import {TableCellNode, TableNode, TableRowNode} from '@lexical/table';

// import {EmojiNode} from './EmojiNode';
// import {ImageNode} from './ImageNode';
// import {TableNode as NewTableNode} from './TableNode';

export type EditorNodes = Array<Klass<LexicalNode>>
const editorNodes: EditorNodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  AutoLinkNode,
  HorizontalRuleNode,
];

export default editorNodes;
export { 
  LinkNode
}
