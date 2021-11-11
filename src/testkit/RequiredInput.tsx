import React from 'react'
import { useFormContext } from 'react-hook-form'

const RequiredInput: React.FC = () => {
  const { register } = useFormContext()
  return (
    <input {...register('test', { required: true })} />
  )
}

export default RequiredInput
