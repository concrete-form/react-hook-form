import { render } from '@testing-library/react'
import { useForm, UseFormProps, SubmitHandler } from 'react-hook-form'
import { useConcreteFormHandler } from '@concrete-form/core'

import Form from '../Form'
import ReactHookFormHandler from '../ReactHookFormHandler'

type FormContextProps = {
  formProps?: UseFormProps
  onSubmit?: SubmitHandler<any>
}

type FormHandlerExtractorProps = {
  getHandler: (handler: ReactHookFormHandler) => void
}

const FormContext: React.FC<FormContextProps> = ({ formProps, onSubmit, children }) => {
  const useFormProps: UseFormProps = {
    mode: 'onTouched',
    ...formProps,
  }
  return (
    <Form form={useForm(useFormProps)} onSubmit={onSubmit}>
      { children }
      <button type="submit">submit</button>
    </Form>
  )
}

const FormHandlerExtractor: React.FC<FormHandlerExtractorProps> = ({ getHandler }) => {
  const formHandler = useConcreteFormHandler() as ReactHookFormHandler
  getHandler(formHandler)
  return null
}

const renderFormAndGetHandler = (children?: React.ReactNode, formProps?: UseFormProps, onSubmit?: SubmitHandler<any>) => {
  let formHandler
  render(
    <FormContext formProps={formProps} onSubmit={onSubmit}>
      { children }
      <FormHandlerExtractor getHandler={(handler: ReactHookFormHandler) => { formHandler = handler }} />
    </FormContext>,
  )
  return formHandler as unknown as ReactHookFormHandler
}

export default renderFormAndGetHandler
