import { FormHandler } from '@concrete-form/core'
import { UseFormReturn } from 'react-hook-form'

export default class ReactHookFormHandler implements FormHandler {
  constructor (private readonly reactHookFormContext: UseFormReturn<any>) {
  }

  public getFormState () {
    const formState = this.reactHookFormContext.formState
    return {
      isValid: !!formState.isValid,
      isSubmitting: !!formState.isSubmitting,
      wasSubmitted: !!formState.isSubmitted,
    }
  }

  public getControlProps (name: string, options?: any) {
    return this.reactHookFormContext.register(name, options)
  }

  public getControlState (name: string) {
    const formState = this.reactHookFormContext.formState
    return {
      value: this.reactHookFormContext.getValues(name),
      errors: this.formatFieldErrors(formState.errors[name]),
      isTouched: !!formState.touchedFields[name],
    }
  }

  public setFieldValue (
    name: string,
    value: any,
    shouldValidate?: boolean,
    shouldTouch?: boolean,
  ) {
    this.reactHookFormContext.setValue(
      name,
      value,
      {
        shouldValidate,
        shouldTouch,
      },
    )
  }

  private formatFieldErrors (errors?: Record<string, any>) {
    return Object.entries(errors?.types || {}).map(([errorType, message]) => {
      // todo : use generic translations when no message is provided
      return typeof message === 'string' ? message : errorType
    }) || []
  }
}
