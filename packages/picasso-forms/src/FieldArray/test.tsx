/* eslint-disable max-lines-per-function */
import React, { Suspense, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FormApi } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { useForm } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import type { FieldArrayRenderProps } from './index'
import { FieldArray, useFieldArray } from './index'

interface Skill {
  name: string
}

const initialValues = { skills: [{ name: 'HTML' }, { name: 'CSS' }] }
// For an array the form holds nothing for
const languages = [{ name: 'Croatian' }]

const renderForm = (children: React.ReactNode) =>
  render(
    <Form
      onSubmit={jest.fn()}
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
    >
      {children}
    </Form>
  )

const SkillList = ({
  fields,
}: Pick<FieldArrayRenderProps<Skill>, 'fields'>) => (
  <ul>
    {fields.map((name, index) => (
      <li key={name}>{fields.value[index].name}</li>
    ))}
  </ul>
)

const getSkills = () =>
  screen.getAllByRole('listitem').map(item => item.textContent)

const PushButton = ({
  fields,
}: Pick<FieldArrayRenderProps<Skill>, 'fields'>) => (
  <button type='button' onClick={() => fields.push({ name: 'JavaScript' })}>
    push
  </button>
)

const PopButton = ({
  fields,
}: Pick<FieldArrayRenderProps<Skill>, 'fields'>) => (
  <button type='button' onClick={() => fields.pop()}>
    pop
  </button>
)

const Toggleable = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(true)

  return (
    <>
      {mounted && children}
      <button type='button' onClick={() => setMounted(current => !current)}>
        toggle
      </button>
    </>
  )
}

// Toggleable, rendering its children again from a layout effect when it
// toggles, as a layout effect or `useSyncExternalStore` above a field can.
// React renders that update before the ones the field's mount effects queue.
// The children are a function, so that the field renders again too
const RerenderingToggleable = ({
  children,
}: {
  children: () => React.ReactNode
}) => {
  const [mounted, setMounted] = useState(true)
  const [, setRenders] = useState(0)

  useIsomorphicLayoutEffect(() => {
    setRenders(renders => renders + 1)
  }, [mounted])

  return (
    <>
      {mounted && children()}
      <button type='button' onClick={() => setMounted(current => !current)}>
        toggle
      </button>
    </>
  )
}

const FirstValue = ({ value }: { value: unknown }) => {
  const [first] = useState(value)

  return <output>{String(first)}</output>
}

// Every value it rendered since it mounted
const RenderedValues = ({ value }: { value: unknown }) => {
  const values = useRef<unknown[]>([])

  values.current.push(value)

  return <output>{values.current.join(' ')}</output>
}

// Reads the array without an `initialValue`, so the form keeps its entry with
// nothing stored
const Reader = () => {
  const { fields } = useFieldArray<Skill>('languages')

  return <span>{`read ${fields.length ?? 0}`}</span>
}

// A wizard step reading the array gives way to the one seeding it, in the same
// commit
const Steps = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1)

  return (
    <>
      {step === 1 ? <Reader /> : children}
      <button type='button' onClick={() => setStep(2)}>
        next
      </button>
    </>
  )
}

// Seeds the array with its own `initialValue` and shows how many items its
// first render had
const SeededLanguages = () => {
  const { fields } = useFieldArray<Skill>('languages', {
    initialValue: languages,
  })

  return <FirstValue value={fields.value?.length} />
}

// Mounts its children on a click, next to fields that stay mounted
const Later = ({ children }: { children: React.ReactNode }) => {
  const [shown, setShown] = useState(false)

  return (
    <>
      {shown && children}
      <button type='button' onClick={() => setShown(true)}>
        show
      </button>
    </>
  )
}

const pushAndRemount = () => {
  fireEvent.click(screen.getByRole('button', { name: 'push' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
}

// Stores an array equal to the initial one item by item, but a new array
const pushPopAndRemount = () => {
  fireEvent.click(screen.getByRole('button', { name: 'push' }))
  fireEvent.click(screen.getByRole('button', { name: 'pop' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
}

// Fails the test on a React warning, such as one for a render-time update
const spyOnWarnings = () => jest.spyOn(console, 'error')

describe('FieldArray', () => {
  it('renders the items through a function child', () => {
    renderForm(
      <FieldArray<Skill> name='skills'>
        {({ fields }) => <SkillList fields={fields} />}
      </FieldArray>
    )

    expect(getSkills()).toEqual(['HTML', 'CSS'])
  })

  it('renders the items through the component prop', () => {
    renderForm(<FieldArray<Skill> name='skills' component={SkillList} />)

    expect(getSkills()).toEqual(['HTML', 'CSS'])
  })

  it('exposes the final-form-arrays mutators, `update` included', () => {
    renderForm(
      <FieldArray<Skill> name='skills'>
        {({ fields }) => (
          <>
            <SkillList fields={fields} />
            <button
              type='button'
              onClick={() => fields.push({ name: 'JavaScript' })}
            >
              push
            </button>
            <button
              type='button'
              onClick={() => fields.update(0, { name: 'HTML5' })}
            >
              update
            </button>
            <button type='button' onClick={() => fields.remove(1)}>
              remove
            </button>
          </>
        )}
      </FieldArray>
    )

    fireEvent.click(screen.getByRole('button', { name: 'push' }))
    fireEvent.click(screen.getByRole('button', { name: 'update' }))
    fireEvent.click(screen.getByRole('button', { name: 'remove' }))

    expect(getSkills()).toEqual(['HTML5', 'JavaScript'])
  })

  it("subscribes to upstream's default keys only, so other meta reads undefined", () => {
    renderForm(
      <FieldArray<Skill> name='skills'>
        {({ meta }) => <span>{`pristine: ${String(meta.pristine)}`}</span>}
      </FieldArray>
    )

    expect(screen.getByText('pristine: undefined')).toBeInTheDocument()
  })

  it('widens the meta to an explicit subscription', () => {
    renderForm(
      <FieldArray<Skill> name='skills' subscription={{ pristine: true }}>
        {({ meta }) => <span>{`pristine: ${String(meta.pristine)}`}</span>}
      </FieldArray>
    )

    expect(screen.getByText('pristine: true')).toBeInTheDocument()
  })

  it('keeps the items the user added when it remounts', () => {
    renderForm(
      <Toggleable>
        <FieldArray<Skill> name='skills'>
          {({ fields }) => (
            <>
              <SkillList fields={fields} />
              <PushButton fields={fields} />
            </>
          )}
        </FieldArray>
      </Toggleable>
    )

    pushAndRemount()

    expect(getSkills()).toEqual(['HTML', 'CSS', 'JavaScript'])
  })

  it('renders its initial items on its first render', () => {
    renderForm(
      <FieldArray<Skill> name='skills'>
        {({ fields }) => <FirstValue value={fields.length} />}
      </FieldArray>
    )

    expect(screen.getByRole('status')).toHaveTextContent('2')
  })

  it.each([
    [
      'a function child',
      {
        children: ({ fields }: FieldArrayRenderProps<Skill>) => (
          <FirstValue value={fields.length} />
        ),
      },
    ],
    [
      '`render`',
      {
        render: ({ fields }: FieldArrayRenderProps<Skill>) => (
          <FirstValue value={fields.length} />
        ),
      },
    ],
    [
      'the component prop',
      {
        component: ({ fields }: FieldArrayRenderProps<Skill>) => (
          <FirstValue value={fields.length} />
        ),
      },
    ],
  ])(
    'renders its initial items on its first render through %s',
    (_, target) => {
      renderForm(<FieldArray<Skill> name='skills' {...target} />)

      expect(screen.getByRole('status')).toHaveTextContent('2')
    }
  )

  it('renders its initial items on its first render when the form sets `destroyOnUnregister`', () => {
    render(
      <Form
        onSubmit={jest.fn()}
        mutators={{ ...arrayMutators }}
        initialValues={initialValues}
        destroyOnUnregister
      >
        <FieldArray<Skill> name='skills' initialValue={initialValues.skills}>
          {({ fields }) => <FirstValue value={fields.length} />}
        </FieldArray>
      </Form>
    )

    expect(screen.getByRole('status')).toHaveTextContent('2')
  })

  it('renders the items of its own `initialValue` on its first render next to a hook that reads the array', () => {
    const consoleError = spyOnWarnings()

    renderForm(
      <>
        <Reader />
        <Later>
          <FieldArray<Skill> name='languages' initialValue={languages}>
            {({ fields }) => <FirstValue value={fields.value?.length} />}
          </FieldArray>
        </Later>
      </>
    )

    fireEvent.click(screen.getByRole('button', { name: 'show' }))

    expect(screen.getByRole('status')).toHaveTextContent('1')
    expect(consoleError).not.toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it('leaves an array the form drops after its first render empty', () => {
    const Languages = () => {
      const form = useForm()

      return (
        <FieldArray<Skill> name='languages' initialValue={languages}>
          {({ fields }) => (
            <>
              <span>{`languages ${fields.length}`}</span>
              <button type='button' onClick={() => form.initialize({})}>
                drop
              </button>
            </>
          )}
        </FieldArray>
      )
    }

    renderForm(<Languages />)

    fireEvent.click(screen.getByRole('button', { name: 'drop' }))

    expect(screen.getByText('languages 0')).toBeInTheDocument()
  })

  it.each(['initialValue', 'defaultValue'] as const)(
    'renders the items of its own `%s` on its first render',
    seed => {
      renderForm(
        <FieldArray<Skill> name='languages' {...{ [seed]: languages }}>
          {({ fields }) => <FirstValue value={fields.length} />}
        </FieldArray>
      )

      expect(screen.getByRole('status')).toHaveTextContent('1')
    }
  )

  it.each(['initialValue', 'defaultValue'] as const)(
    'renders the items of its own `%s` on its first render after a step that reads the array',
    seed => {
      renderForm(
        <Steps>
          <FieldArray<Skill> name='languages' {...{ [seed]: languages }}>
            {({ fields }) => <FirstValue value={fields.value?.length} />}
          </FieldArray>
        </Steps>
      )

      fireEvent.click(screen.getByRole('button', { name: 'next' }))

      expect(screen.getByRole('status')).toHaveTextContent('1')
    }
  )

  it('renders the stored items on its first render after a remount', () => {
    renderForm(
      <Toggleable>
        <FieldArray<Skill> name='skills'>
          {({ fields }) => (
            <>
              <FirstValue value={fields.length} />
              <PushButton fields={fields} />
            </>
          )}
        </FieldArray>
      </Toggleable>
    )

    pushAndRemount()

    expect(screen.getByRole('status')).toHaveTextContent('3')
  })

  it('renders the stored items on every render after a remount that a layout effect above renders again', () => {
    renderForm(
      <RerenderingToggleable>
        {() => (
          <FieldArray<Skill> name='skills'>
            {({ fields }) => (
              <>
                <RenderedValues value={fields.length} />
                <PushButton fields={fields} />
              </>
            )}
          </FieldArray>
        )}
      </RerenderingToggleable>
    )

    pushAndRemount()

    expect(screen.getByRole('status')).toHaveTextContent(/^3( 3)*$/)
  })

  it('reports equal items as pristine on its first render after a remount', () => {
    renderForm(
      <Toggleable>
        <FieldArray<Skill> name='skills' subscription={{ pristine: true }}>
          {({ fields, meta }) => (
            <>
              <FirstValue value={meta.pristine} />
              <PushButton fields={fields} />
              <PopButton fields={fields} />
            </>
          )}
        </FieldArray>
      </Toggleable>
    )

    pushPopAndRemount()

    expect(screen.getByRole('status')).toHaveTextContent('true')
  })

  describe('useFieldArray', () => {
    it('returns the fields of the named array, typed by the item', () => {
      const Skills = () => {
        const { fields } = useFieldArray<Skill>('skills')
        const names = fields.value.map(skill => skill.name).join(', ')

        return <span>{`${names} (${fields.length})`}</span>
      }

      renderForm(<Skills />)

      expect(screen.getByText('HTML, CSS (2)')).toBeInTheDocument()
    })

    it('keeps the items the user added when the array remounts', () => {
      const Skills = () => {
        const { fields } = useFieldArray<Skill>('skills')

        return (
          <>
            <SkillList fields={fields} />
            <PushButton fields={fields} />
          </>
        )
      }

      renderForm(
        <Toggleable>
          <Skills />
        </Toggleable>
      )

      pushAndRemount()

      expect(getSkills()).toEqual(['HTML', 'CSS', 'JavaScript'])
    })

    it('renders the initial items on the first render', () => {
      const Skills = () => {
        const { fields } = useFieldArray<Skill>('skills')

        return <FirstValue value={fields.length} />
      }

      renderForm(<Skills />)

      expect(screen.getByRole('status')).toHaveTextContent('2')
    })

    it('renders the items of its own `initialValue` on the first render', () => {
      const Languages = () => {
        const { fields } = useFieldArray<Skill>('languages', {
          initialValue: languages,
        })

        return <FirstValue value={fields.length} />
      }

      renderForm(<Languages />)

      expect(screen.getByRole('status')).toHaveTextContent('1')
    })

    describe('when another hook reads the array without an `initialValue`', () => {
      it('renders the items of its own `initialValue` on the first render after the reader unmounts', () => {
        const consoleError = spyOnWarnings()

        renderForm(
          <Steps>
            <SeededLanguages />
          </Steps>
        )

        fireEvent.click(screen.getByRole('button', { name: 'next' }))

        expect(screen.getByRole('status')).toHaveTextContent('1')
        expect(consoleError).not.toHaveBeenCalled()
        consoleError.mockRestore()
      })

      it('renders the items of its own `initialValue` on the first render next to the reader', () => {
        const consoleError = spyOnWarnings()

        renderForm(
          <>
            <Reader />
            <Later>
              <SeededLanguages />
            </Later>
          </>
        )

        fireEvent.click(screen.getByRole('button', { name: 'show' }))

        expect(screen.getByRole('status')).toHaveTextContent('1')
        expect(screen.getByText('read 1')).toBeInTheDocument()
        expect(consoleError).not.toHaveBeenCalled()
        consoleError.mockRestore()
      })

      it('renders the items of its own `initialValue` when its suspended first render retries after a reset, and leaves nothing registered', async () => {
        const formRef: { current?: FormApi } = {}
        const CaptureForm = () => {
          formRef.current = useForm()

          return null
        }
        let suspending = true
        let resume = () => {}
        const resumed = new Promise<void>(resolve => {
          resume = resolve
        })
        const Suspending = () => {
          if (suspending) {
            throw resumed
          }

          return null
        }

        const { unmount } = renderForm(
          <>
            <CaptureForm />
            <Reader />
            <Later>
              <Suspense fallback={null}>
                <SeededLanguages />
                <Suspending />
              </Suspense>
            </Later>
          </>
        )

        fireEvent.click(screen.getByRole('button', { name: 'show' }))
        act(() => formRef.current?.initialize({}))
        await act(async () => {
          suspending = false
          resume()
          await resumed
        })

        expect(screen.getByRole('status')).toHaveTextContent('1')

        unmount()

        expect(formRef.current?.getRegisteredFields()).not.toContain(
          'languages'
        )
      })
    })

    it('leaves an array the form drops after the first render empty', () => {
      const Languages = () => {
        const form = useForm()
        const { fields } = useFieldArray<Skill>('languages', {
          initialValue: languages,
        })

        return (
          <>
            <span>{`languages ${fields.length}`}</span>
            <button type='button' onClick={() => form.initialize({})}>
              drop
            </button>
          </>
        )
      }

      renderForm(<Languages />)

      fireEvent.click(screen.getByRole('button', { name: 'drop' }))

      expect(screen.getByText('languages 0')).toBeInTheDocument()
    })

    it('renders the stored items on the first render after a remount', () => {
      const Skills = () => {
        const { fields } = useFieldArray<Skill>('skills')

        return (
          <>
            <FirstValue value={fields.length} />
            <PushButton fields={fields} />
          </>
        )
      }

      renderForm(
        <Toggleable>
          <Skills />
        </Toggleable>
      )

      pushAndRemount()

      expect(screen.getByRole('status')).toHaveTextContent('3')
    })

    it('reports equal items as pristine on the first render after a remount', () => {
      const Skills = () => {
        const { fields, meta } = useFieldArray<Skill>('skills', {
          subscription: { pristine: true },
        })

        return (
          <>
            <FirstValue value={meta.pristine} />
            <PushButton fields={fields} />
            <PopButton fields={fields} />
          </>
        )
      }

      renderForm(
        <Toggleable>
          <Skills />
        </Toggleable>
      )

      pushPopAndRemount()

      expect(screen.getByRole('status')).toHaveTextContent('true')
    })
  })
})
