import React from 'react'
import { Button } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso/lab'
import { useNotifications } from '@toptal/picasso/utils'
import { useModals } from '@toptal/picasso/lab/utils'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const handleClick = async () => {
    const { result, hide } = await showPrompt('Country', 'Select country:', {
      // eslint-disable-next-line react/display-name
      children: ({ setResult }) => (
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

    showInfo(result)
    hide()
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
