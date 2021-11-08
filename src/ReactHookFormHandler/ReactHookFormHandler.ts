import { FormHandler } from '@concrete-form/core'
import TranslationKeys from '@concrete-form/core/translation/TranslationKeys.enum'
import { UseFormReturn } from 'react-hook-form'

export default class ReactHookFormHandler implements FormHandler {
  private cachedControlOptions: Record<string, any> = {}
  constructor (private readonly reactHookFormContext: UseFormReturn<any>) {
  }

  public getFormState () {
    const formState = this.reactHookFormContext.formState
    return {
      isSubmitting: !!formState.isSubmitting,
      hasErrors: Object.keys(formState.errors).length > 0,
    }
  }

  public getControlProps (name: string, options?: any) {
    this.cachedControlOptions[name] = options
    return this.reactHookFormContext.register(name, options)
  }

  public getControlState (name: string) {
    const formState = this.reactHookFormContext.formState
    return {
      value: this.reactHookFormContext.getValues(name),
      errors: this.formatFieldErrors(name, formState.errors[name]),
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

  private formatFieldErrors (name: string, errors?: Record<string, any>) {
    if (!errors) {
      return []
    }
    const types = typeof errors?.types === 'object' ? errors.types : { [errors.type]: errors.message }

    return Object.entries(types).map(([errorType, message]) => {
      if (message === true) {
        return this.getGenericErrorMessage(errorType, this.cachedControlOptions[name] ?? {})
      }
      return typeof message === 'string' ? message : { key: TranslationKeys.DEFAULT, meta: { error: message } }
    }) || []
  }

  /**
   * Translate React Hook Form built-in validations
   */
  private getGenericErrorMessage (type: string, options: Record<string, string|number>) {
    switch (type) {
      case 'required':
        return { key: TranslationKeys.REQUIRED, meta: { type } }
      case 'minLength':
        return { key: TranslationKeys.STRING_MIN, values: { min: options.minLength }, meta: { type } }
      case 'maxLength':
        return { key: TranslationKeys.STRING_MAX, values: { max: options.maxLength }, meta: { type } }
      case 'min':
        return { key: TranslationKeys.NUMBER_MIN, values: { min: options.min }, meta: { type } }
      case 'max':
        return { key: TranslationKeys.NUMBER_MAX, values: { max: options.max }, meta: { type } }
      case 'pattern':
        return { key: TranslationKeys.DEFAULT, meta: { type } }
      case 'validate':
        return { key: TranslationKeys.DEFAULT, meta: { type } }
      default:
        return { key: TranslationKeys.DEFAULT, meta: { type } }
    }
  }
}
