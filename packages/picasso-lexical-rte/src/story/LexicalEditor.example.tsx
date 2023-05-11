import React from 'react'
import { LexicalRTE, LinkPlugin, LinkNode } from '@toptal/picasso-lexical-rte'

const Example = () => { 
  return (
    <LexicalRTE nodes={[LinkNode]}>
      <LinkPlugin />
    </LexicalRTE>
  );
}

export default Example
