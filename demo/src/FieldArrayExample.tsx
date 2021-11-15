import { useFieldArray, useForm } from 'react-hook-form'

import Form from '@concrete-form/react-hook-form'
import Input from '@concrete-form/html5/Input'
import SubmitButton from '@concrete-form/html5/SubmitButton'

const Fieldarrayexample: React.FC = () => {
  const form = useForm({ defaultValues: { foo: [{ value: 'foo' }, { value: 'bar' }] } })
  const { fields, append, remove } = useFieldArray({ name: 'foo', control: form.control })

  const onSubmit = (data: any) => {
    console.log('submitted', data)
  }

  return (
    <Form form={form} onSubmit={onSubmit}>

      { fields.map((field, index) => (
        <div key={field.id} style={{ display: 'flex' }}>
          <Input name={`foo.${index}.value`} /> <button type="button" onClick={() => remove(index)}>X</button>
        </div>
      )) }
      <button type="button" onClick={() => append({ value: '' })}>Add</button><br />
      <hr />

      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}

export default Fieldarrayexample
