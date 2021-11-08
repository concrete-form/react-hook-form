import { useForm } from 'react-hook-form'

import Form from '@concrete-form/react-hook-form'
import Input from '@concrete-form/html5/Input'
import SubmitButton from '@concrete-form/html5/SubmitButton'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

const App: React.FC = () => {
  const form = useForm({
    defaultValues: {
      validationRequired: '',
      validationMinlength: 't',
      validationMaxlength: 'test',
      validationMin: 2,
      validationMax: 5,
      validationPattern: '0',
      validationValidate: 't',
    },
    mode: 'onTouched',
    criteriaMode: 'all',
  })

  const onSubmit = async (data: any) => {
    await wait(1000)
    console.log(data)
  }

  return (
    <>
      <h1>React Hook Form validations</h1>

      <Form
        form={form}
        onSubmit={onSubmit}
        formProps={{
          style: { background: '#ececec', padding: 15 },
        }}
        noValidate
      >
        <Input
          name="validationRequired"
          placeholder="Validation Required"
          fieldProps={{
            required: true,
          }}
        />

        <Input
          name="validationMinlength"
          placeholder="Validation Minlength (3)"
          fieldProps={{
            required: true,
            minLength: 3,
          }}
        />

        <Input
          name="validationMaxlength"
          placeholder="Validation Maxlength (3)"
          fieldProps={{
            required: true,
            maxLength: 3,
          }}
        />

        <Input
          name="validationMin"
          placeholder="Validation Min (3)"
          type="number"
          fieldProps={{
            required: true,
            min: 3,
          }}
        />

        <Input
          name="validationMax"
          placeholder="Validation Max (3)"
          type="number"
          fieldProps={{
            required: true,
            max: 3,
          }}
        />

        <Input
          name="validationPattern"
          placeholder="Validation Pattern (/^[a-z]+$/i)"
          fieldProps={{
            required: true,
            pattern: /^[a-z]+$/i,
          }}
        />

        <Input
          name="validationValidate"
          placeholder="Validation Validate (need to be &quot;foo&quot;)"
          fieldProps={{
            validate: (value: string) => value === 'foo',
          }}
        />

        <br />
        <SubmitButton>Submit</SubmitButton>

      </Form>
    </>
  )
}

export default App
