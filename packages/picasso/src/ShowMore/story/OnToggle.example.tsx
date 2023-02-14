import React, { useState } from 'react'
import { ShowMore, Tag } from '@toptal/picasso'

const Example = () => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <div style={{ width: '430px' }}>
      {isExpanded ? (
        <Tag variant='green'>expanded</Tag>
      ) : (
        <Tag variant='red'>closed</Tag>
      )}

      <ShowMore onToggle={setExpanded}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
        quam odit omnis quod in voluptates est doloremque nulla sequi, illum
        deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
        omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
        beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
        voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
        similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
        doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
        omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Eos earum vitae quam odit omnis quod in voluptates est doloremque nulla
        sequi, illum deleniti, beatae quo? Eaque similique nemo omnis quasi?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
        quam odit omnis quod in voluptates est doloremque nulla sequi, illum
        deleniti, beatae quo? Eaque similique nemo omnis quasi?
      </ShowMore>
    </div>
  )
}

export default Example
