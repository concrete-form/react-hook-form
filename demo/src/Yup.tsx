/* eslint-disable @typescript-eslint/no-unused-vars */

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import YupTranslator from '@concrete-form/core/YupTranslator'
import Form from '@concrete-form/react-hook-form'
import Input from '@concrete-form/html5/Input'
import SubmitButton from '@concrete-form/html5/SubmitButton'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

const App: React.FC = () => {
  const schema = yup.object().shape({
    validationRequired: yup.string().required(),
    validationMinlength: yup.string().min(3),
    validationMaxlength: yup.string().max(3),
    validationMin: yup.number().min(3),
    validationMax: yup.number().max(3),
    validationLt: yup.number().lessThan(3),
    validationPattern: yup.string().matches(/^[a-z]+$/i),
    validationValidate: yup.string().test('is-foo', (value?: string) => value === 'foo'),
    foo: yup.object().shape({
      bar: yup.string().min(5).lowercase(),
    }).required(),
  }).required()

  const form = useForm({
    defaultValues: {
      validationRequired: '',
      validationMinlength: 't',
      validationMaxlength: 'test',
      validationMin: 2,
      validationMax: 5,
      validationLt: 3,
      validationPattern: '0',
      validationValidate: 't',
      foo: {
        bar: 'f',
      },
    },
    mode: 'onTouched',
    criteriaMode: 'all',
    resolver: yupResolver(new YupTranslator(schema)),
    // resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    await wait(1000)
    console.log(data)
  }

  return (
    <>
      <h1>Yup validation</h1>

      <Form
        form={form}
        onSubmit={onSubmit}
        formProps={{
          style: { background: '#ececec', padding: 15 },
        }}
        noValidate
        // translator={(value: any) => { console.log(value); return '...' }}
      >
        <Input
          name="validationRequired"
          placeholder="Validation Required"
        />

        <Input
          name="validationMinlength"
          placeholder="Validation Minlength (3)"
        />

        <Input
          name="validationMaxlength"
          placeholder="Validation Maxlength (3)"
        />

        <Input
          name="validationMin"
          placeholder="Validation Min (3)"
          type="number"
        />

        <Input
          name="validationMax"
          placeholder="Validation Max (3)"
          type="number"
        />

        <Input
          name="validationLt"
          placeholder="Validation < 3"
          type="number"
        />

        <Input
          name="validationPattern"
          placeholder="Validation Pattern (/^[a-z]+$/i)"
        />

        <Input
          name="validationValidate"
          placeholder="Validation Validate (need to be &quot;foo&quot;)"
        />

        <Input
          name="foo.bar"
          placeholder="foo.bar"
        />

        <br />
        <SubmitButton>Submit</SubmitButton>

      </Form>
    </>
  )
}

export default App
