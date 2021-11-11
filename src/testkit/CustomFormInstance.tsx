import { useForm, UseFormProps, SubmitHandler } from 'react-hook-form'
import { ConcreteFormProps } from '@concrete-form/core'

import Form from '../Form'

type CustomFormInstanceProps = {
  useFormProps?: UseFormProps
  onSubmit?: SubmitHandler<any>
} & ConcreteFormProps

const CustomFormInstance: React.FC<CustomFormInstanceProps> = ({
  useFormProps,
  onSubmit,
  formProps: customFormProps = {},
  children,
  ...props
}) => {
  const formProps = {
    ...customFormProps,
    'data-testid': 'form',
  }
  return (
    <Form form={useForm(useFormProps)} onSubmit={onSubmit} formProps={formProps} {...props}>
      { children }
      <button type="submit">submit</button>
    </Form>
  )
}

export default CustomFormInstance
