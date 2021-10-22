import React from 'react'
import { useControlProps, useControlState, useFormState, ControlProps } from '@concrete-form/core'

type InputProps = ControlProps & React.InputHTMLAttributes<HTMLInputElement>

/*
 * this is an example of a concrete form UI kit implementation
 */
const Input: React.FC<InputProps> = ({ name, fieldProps, ...inputProps }) => {
  const { isSubmitting } = useFormState()

  const controlledFieldProps = useControlProps(name, fieldProps)

  const { errors } = useControlState(name)
  const disabled = inputProps.disabled ?? controlledFieldProps.disabled ?? isSubmitting

  return (
    <>
      <input {...inputProps} {...controlledFieldProps} disabled={disabled} />
      { errors.map((error: string) => (
        <div key={error} style={{ color: '#f00' }}>{ error }</div>
      )) }
      <br />
    </>
  )
}

export default Input
