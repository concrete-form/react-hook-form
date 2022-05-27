/* eslint-disable testing-library/render-result-naming-convention */
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import YupTranslator from '@concrete-form/core/YupTranslator'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import renderFormAndGetHandler from '../testkit/renderFormAndGetHandler'
import RequiredInput from '../testkit/RequiredInput'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

describe('ReactHookFormHandler', () => {
  describe('getFormState', () => {
    it('returns isSubmitting=true when form is submitting', async () => {
      const onSubmit = jest.fn(async () => await wait(50))
      const formHandler = renderFormAndGetHandler(undefined, undefined, onSubmit)

      expect(formHandler.getFormState().isSubmitting).toBe(false)
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))

      expect(formHandler.getFormState().isSubmitting).toBe(true)
      await waitFor(() => {
        expect(formHandler.getFormState().isSubmitting).toBe(false)
      })
      expect(onSubmit).toHaveBeenCalled()
    })

    it('returns hasErrors=true when form has errors', async () => {
      const onSubmit = jest.fn()
      const formHandler = renderFormAndGetHandler(<RequiredInput />, undefined, onSubmit)
      const input = screen.getByRole('textbox')

      expect(formHandler.getFormState().hasErrors).toBe(false)
      await userEvent.click(input)
      await userEvent.click(document.body)
      await waitFor(() => {
        expect(formHandler.getFormState().hasErrors).toBe(true)
      })
      await userEvent.type(input, 'foo')
      await waitFor(() => {
        expect(formHandler.getFormState().hasErrors).toBe(false)
      })
    })
  })

  describe('getControlProps', () => {
    it('register field on the form the first and returns it after', async () => {
      const onSubmit = jest.fn()
      const formHandler = renderFormAndGetHandler(undefined, undefined, onSubmit)
      const props = formHandler.getControlProps('foo', { value: 'bar' })

      expect(props).toEqual({
        name: 'foo',
        onChange: expect.anything(),
        onBlur: expect.anything(),
        ref: expect.anything(),
      })
      expect(formHandler.getControlProps('foo').name).toBe(props.name)
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ foo: 'bar' }, expect.anything())
      })
    })

    it('forwards options to react-hook-form', async () => {
      const formHandler = renderFormAndGetHandler()
      const props = formHandler.getControlProps('foo', { disabled: true })

      expect(props).toHaveProperty('disabled', true)
    })
  })

  describe('setFieldValue', () => {
    it('set field value', async () => {
      const formHandler = renderFormAndGetHandler()
      formHandler.getControlProps('foo', { value: 'foo' })
      formHandler.setFieldValue('foo', 'bar')
      expect(formHandler.getControlState('foo').value).toBe('bar')
    })

    it('validate the field when updating the value', async () => {
      const formHandler = renderFormAndGetHandler()
      formHandler.getControlProps('foo', { minLength: 4 })
      formHandler.setFieldValue('foo', 'bar', false)
      expect(formHandler.getControlState('foo').errors).toHaveLength(0)
      formHandler.setFieldValue('foo', 'bar', true)

      await waitFor(() => {
        expect(formHandler.getControlState('foo').errors).toHaveLength(1)
      })
    })
  })

  describe('getControlState', () => {
    it('returns control value', async () => {
      const formHandler = renderFormAndGetHandler(<RequiredInput />, { defaultValues: { test: 'foo' } })
      const input = screen.getByRole('textbox')
      expect(formHandler.getControlState('test').value).toBe('foo')
      await userEvent.clear(input)
      await userEvent.type(input, 'bar')
      expect(formHandler.getControlState('test').value).toBe('bar')
    })

    it('returns control errors', async () => {
      const formHandler = renderFormAndGetHandler(<RequiredInput />)
      const input = screen.getByRole('textbox')
      expect(formHandler.getControlState('test').errors).toEqual([])
      await userEvent.click(input)
      await userEvent.click(document.body)

      await waitFor(() => {
        expect(formHandler.getControlState('test').errors).toHaveLength(1)
      })
    })
  })

  describe('React hook errors formatting', () => {
    it('returns all errors', async () => {
      const formHandler = renderFormAndGetHandler(undefined, { criteriaMode: 'all' })
      formHandler.getControlProps('multiple', { minLength: 5, pattern: /^[a-z]*$/ })
      formHandler.setFieldValue('multiple', '123', true)

      await waitFor(() => {
        expect(formHandler.getControlState('multiple').errors).toHaveLength(2)
      })
    })

    it('handle arrays of errors', async () => {
      const schema = new YupTranslator(Yup.object({
        test: Yup.array().of(Yup.string().min(3, 'err1').max(3, 'err2')).min(1).required(),
      }))
      const formHandler = renderFormAndGetHandler(undefined, { criteriaMode: 'all', resolver: yupResolver(new YupTranslator(schema)) })
      formHandler.getControlProps('test')
      formHandler.setFieldValue('test', ['fo', 'barr'], true)

      await waitFor(() => {
        expect(formHandler.getControlState('test').errors).toEqual(['err1', 'err2'])
      })
    })

    it('ignores duplicated errors', async () => {
      const schema = new YupTranslator(Yup.object({
        test: Yup.array().of(Yup.string().min(3, 'err1')).min(1).required(),
      }))
      const formHandler = renderFormAndGetHandler(undefined, { criteriaMode: 'all', resolver: yupResolver(new YupTranslator(schema)) })
      formHandler.getControlProps('test')
      formHandler.setFieldValue('test', ['fo', 'ba'], true)

      await waitFor(() => {
        expect(formHandler.getControlState('test').errors).toEqual(['err1'])
      })
    })

    describe('Errors without message', () => {
      it('converts required validation', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('required', { required: true })
        formHandler.setFieldValue('required', '', true)

        await waitFor(() => {
          expect(formHandler.getControlState('required').errors).toEqual([
            { key: 'required', meta: { args: { options: expect.anything(), type: 'required' }, from: 'react-hook-form' } },
          ])
        })
      })

      it('converts minLength validation', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('minLength', { minLength: 2 })
        formHandler.setFieldValue('minLength', 'f', true)

        await waitFor(() => {
          expect(formHandler.getControlState('minLength').errors).toEqual([
            { key: 'minlength', values: { min: '2' }, meta: { args: { options: expect.anything(), type: 'minLength' }, from: 'react-hook-form' } },
          ])
        })
      })

      it('converts maxLength validation', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('maxLength', { maxLength: 2 })
        formHandler.setFieldValue('maxLength', 'foo', true)

        await waitFor(() => {
          expect(formHandler.getControlState('maxLength').errors).toEqual([
            { key: 'maxlength', values: { max: '2' }, meta: { args: { options: expect.anything(), type: 'maxLength' }, from: 'react-hook-form' } },
          ])
        })
      })

      it('converts min validation', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('min', { min: 2 })
        formHandler.setFieldValue('min', 1, true)

        await waitFor(() => {
          expect(formHandler.getControlState('min').errors).toEqual([
            { key: 'min', values: { min: '2' }, meta: { args: { options: expect.anything(), type: 'min' }, from: 'react-hook-form' } },
          ])
        })
      })

      it('converts max validation', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('max', { max: 2 })
        formHandler.setFieldValue('max', 3, true)

        await waitFor(() => {
          expect(formHandler.getControlState('max').errors).toEqual([
            { key: 'max', values: { max: '2' }, meta: { args: { options: expect.anything(), type: 'max' }, from: 'react-hook-form' } },
          ])
        })
      })

      it('converts pattern validation', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('pattern', { pattern: /^[a-z]+$/ })
        formHandler.setFieldValue('pattern', 'a1b', true)

        await waitFor(() => {
          expect(formHandler.getControlState('pattern').errors).toEqual([
            { key: 'default', meta: { args: { options: expect.anything(), type: 'pattern' }, from: 'react-hook-form' } },
          ])
        })
      })

      it('converts custom validation', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('custom', { validate: (value: string) => value === 'foo' })
        formHandler.setFieldValue('custom', 'bar', true)

        await waitFor(() => {
          expect(formHandler.getControlState('custom').errors).toEqual([
            { key: 'default', meta: { args: { options: expect.anything(), type: 'validate' }, from: 'react-hook-form' } },
          ])
        })
      })
    })

    describe('Errors with message', () => {
      it('keeps required validation message', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('required', { required: 'custom' })
        formHandler.setFieldValue('required', '', true)

        await waitFor(() => {
          expect(formHandler.getControlState('required').errors).toEqual(['custom'])
        })
      })

      it('keeps minLength validation message', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('minLength', { minLength: { value: 2, message: 'custom' } })
        formHandler.setFieldValue('minLength', 'f', true)

        await waitFor(() => {
          expect(formHandler.getControlState('minLength').errors).toEqual(['custom'])
        })
      })

      it('keeps maxLength validation message', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('maxLength', { maxLength: { value: 2, message: 'custom' } })
        formHandler.setFieldValue('maxLength', 'foo', true)

        await waitFor(() => {
          expect(formHandler.getControlState('maxLength').errors).toEqual(['custom'])
        })
      })

      it('keeps min validation message', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('min', { min: { value: 2, message: 'custom' } })
        formHandler.setFieldValue('min', 1, true)

        await waitFor(() => {
          expect(formHandler.getControlState('min').errors).toEqual(['custom'])
        })
      })

      it('kleeps max validation message', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('max', { max: { value: 2, message: 'custom' } })
        formHandler.setFieldValue('max', 3, true)

        await waitFor(() => {
          expect(formHandler.getControlState('max').errors).toEqual(['custom'])
        })
      })

      it('keeps pattern validation message', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('pattern', { pattern: { value: /^[a-z]+$/, message: 'custom' } })
        formHandler.setFieldValue('pattern', 'a1b', true)

        await waitFor(() => {
          expect(formHandler.getControlState('pattern').errors).toEqual(['custom'])
        })
      })

      it('keeps custom validation message', async () => {
        const formHandler = renderFormAndGetHandler()
        formHandler.getControlProps('custom', { validate: (value: string) => value === 'foo' ? true : 'custom' })
        formHandler.setFieldValue('custom', 'bar', true)

        await waitFor(() => {
          expect(formHandler.getControlState('custom').errors).toEqual(['custom'])
        })
      })
    })
  })
})
