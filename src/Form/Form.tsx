import React from 'react'
import { ConcreteFormProvider, ConcreteFormProps } from '@concrete-form/core'
import { FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form'

import ReactHookFormHandler from '../ReactHookFormHandler'

type ReactHookFormProps = {
  form: UseFormReturn<any>
  onSubmit: SubmitHandler<any>
} & ConcreteFormProps

const Form: React.FC<ReactHookFormProps> = ({
  form,
  onSubmit,
  formProps,
  noValidate,
  children,
  ...concreteFormConfig
}) => {
  return (
    <ConcreteFormProvider formHandler={new ReactHookFormHandler(form)} config={concreteFormConfig}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate={noValidate}
          {...formProps}
        >
          { children }
        </form>
      </FormProvider>
    </ConcreteFormProvider>
  )
}

export default Form
