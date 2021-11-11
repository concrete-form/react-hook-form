import React, { useMemo } from 'react'
import { ConcreteFormProvider, ConcreteFormProps } from '@concrete-form/core'
import { FormProvider, UseFormReturn, SubmitHandler, useForm } from 'react-hook-form'

import ReactHookFormHandler from '../ReactHookFormHandler'

type ReactHookFormProps = {
  form?: UseFormReturn<any>
  onSubmit?: SubmitHandler<any>
} & ConcreteFormProps

const DefaultForm: React.FC<ReactHookFormProps> = props => <Form {...props} form={useForm()} />

const Form: React.FC<ReactHookFormProps> = ({
  form,
  onSubmit,
  formProps,
  noValidate = true,
  children,
  ...concreteFormConfig
}) => {
  const formHandler = useMemo(() => form && new ReactHookFormHandler(form), [form])

  if (!form || !formHandler) {
    return (
      <DefaultForm
        onSubmit={onSubmit}
        formProps={formProps}
        noValidate={noValidate}
        {...concreteFormConfig}
      >
        { children }
      </DefaultForm>
    )
  }

  return (
    <ConcreteFormProvider formHandler={formHandler} config={concreteFormConfig}>
      <FormProvider {...form}>
        <form
          onSubmit={onSubmit && form.handleSubmit(onSubmit)}
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
