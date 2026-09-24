import React, { useState } from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'
import arrayMutators from 'final-form-arrays'

import { FormCompound as Form } from '../FormCompound'
import type { FieldArrayRenderProps } from './index'
import { FieldArray, useFieldArray } from './index'

interface Skill {
  name: string
}

const initialValues = { skills: [{ name: 'HTML' }, { name: 'CSS' }] }

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

// Keeps the value it first renders with, as an uncontrolled editor does
const FirstValue = ({ value }: { value: unknown }) => {
  const [first] = useState(value)

  return <output>{String(first)}</output>
}

const pushAndRemount = () => {
  fireEvent.click(screen.getByRole('button', { name: 'push' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
}

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
  })
})
