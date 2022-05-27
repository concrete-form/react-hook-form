import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Form from './Form'
import CustomFormInstance from '../testkit/CustomFormInstance'

// using "any" as a workaround for a bug in typescript : https://github.com/microsoft/TypeScript/issues/28960
const testIdForm = { formProps: { 'data-testid': 'form' } } as any

describe('Form', () => {
  describe('Using no form instance', () => {
    it('render novalidate by default', () => {
      render(<Form {...testIdForm} />)
      expect(screen.getByTestId('form')).toHaveProperty('noValidate', true)
    })

    it('doesn\'t render novalidate when disabled', () => {
      render(<Form {...testIdForm} noValidate={false} />)
      expect(screen.getByTestId('form')).toHaveProperty('noValidate', false)
    })

    it('renders children', () => {
      render(<Form>test-children</Form>)
      expect(screen.getByText('test-children')).toBeInTheDocument()
    })

    it('calls onSubmit', async () => {
      const onSubmit = jest.fn()
      render(<Form onSubmit={onSubmit}><button type="submit">submit</button></Form>)
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
      })
    })
  })

  describe('Using an existing form instrance', () => {
    it('render novalidate by default', () => {
      render(<CustomFormInstance />)
      expect(screen.getByTestId('form')).toHaveProperty('noValidate', true)
    })

    it('doesn\'t render novalidate when disabled', () => {
      render(<CustomFormInstance noValidate={false} />)
      expect(screen.getByTestId('form')).toHaveProperty('noValidate', false)
    })

    it('renders children', () => {
      render(<CustomFormInstance>test-children</CustomFormInstance>)
      expect(screen.getByText('test-children')).toBeInTheDocument()
    })

    it('calls onSubmit', async () => {
      const onSubmit = jest.fn()
      render(<CustomFormInstance onSubmit={onSubmit} />)
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
      })
    })
  })
})
