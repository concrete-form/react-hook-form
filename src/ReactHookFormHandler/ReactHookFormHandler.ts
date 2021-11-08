import { FormHandler, Translation, TranslationKeys } from '@concrete-form/core'
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

  private formatFieldErrors (name: string, errors?: Record<string, any>): Translation[] {
    if (!errors) {
      return []
    }
    const types = typeof errors?.types === 'object' ? errors.types : { [errors.type]: errors.message }

    return Object.entries(types).map(([errorType, message]) => {
      if (message === true) {
        return this.getGenericErrorMessage(errorType, this.cachedControlOptions[name] ?? {})
      }
      return message as any
    }) || []
  }

  /**
   * Translate React Hook Form built-in validations
   */
  private getGenericErrorMessage (type: string, options: Record<string, string|number>): Translation {
    const meta = { from: 'react-hook-form', args: { type, options } }
    switch (type) {
      case 'required':
        return { key: TranslationKeys.REQUIRED, meta }
      case 'minLength':
        return { key: TranslationKeys.MINLENGTH, values: { min: String(options.minLength) }, meta }
      case 'maxLength':
        return { key: TranslationKeys.MAXLENGTH, values: { max: String(options.maxLength) }, meta }
      case 'min':
        return { key: TranslationKeys.MIN, values: { min: String(options.min) }, meta }
      case 'max':
        return { key: TranslationKeys.MAX, values: { max: String(options.max) }, meta }
      default:
        return { key: TranslationKeys.DEFAULT, meta }
    }
  }
}
