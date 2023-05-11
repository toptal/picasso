import React from 'react'
import { LexicalRTE, LinkPlugin, LinkNode } from '@toptal/picasso-lexical-rte'

const Example = () => { 
  return (
    <LexicalRTE nodes={[LinkNode]} config={{ headings: ['h3']  }}>
      <LinkPlugin />
    </LexicalRTE>
  );
}

export default Example
