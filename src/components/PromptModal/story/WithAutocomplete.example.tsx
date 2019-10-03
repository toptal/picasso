import React from 'react'
import { Button } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso/lab'
import { useModals } from '@toptal/picasso/utils'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()

  const handleClick = async () => {
    const result = await showPrompt('Country', 'Select country:', {
      // eslint-disable-next-line react/display-name
      children: setResult => (
        <Autocomplete
          width='full'
          placeholder='Start typing country...'
          options={options}
          onSelect={item => setResult(item)}
        />
      ),
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    window.alert(result)
  }

  return (
    <React.Fragment>
      <div id='modal-container' style={{ width: '400px', height: '50px' }}>
        <Button onClick={handleClick}>Open prompt</Button>
      </div>
    </React.Fragment>
  )
}

export default PromptModalDefaultExample
