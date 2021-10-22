import React from 'react'
import { useForm } from 'react-hook-form'
import Form from '@concrete-form/react-hook-form'

import Input from './Input'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

const App: React.FC = () => {
  const form = useForm({ defaultValues: { foo: 'Foo' }, mode: 'onTouched', criteriaMode: 'all' })

  const onSubmit = async (...args: any[]) => {
    await wait(2000)
    console.log(args)
  }

  return (
    <>
      <h1>Demo</h1>
      <Form
        form={form}
        onSubmit={onSubmit}
        formProps={{
          style: { background: '#ececec', padding: 15 },
        }}
        noValidate
      >
        <Input
          name="foo"
          fieldProps={{
            required: 'This field is required',
            pattern: { value: /^[a-z]+$/i, message: 'This field only accept letters' },
          }}
        />

        <Input name="bar" fieldProps={{ required: true }} />

        <br />
        <button type="submit">Send</button>

      </Form>
    </>
  )
}

export default App
