# Doc
# `<Form />`
```jsx
import { Form } from '@concrete-form/react-hook-form'
import { useForm } from 'react-hook-form'

const Example = () => {
  const form = useForm({...})
  return (
    <Form form={form} onSubmit={...}>
      ...
    </Form>
  )
}
```

## Dependencies

| Dependency | Version |
| --- | --- |
| `react` | >= 16 |
| `react-hook-form` | >= 7 |

## Install

```bash
yarn add @concrete-form/react-hook-form
# or
npm install @concrete-form/react-hook-form
```
## Props

| Prop | From | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `form` | `@concrete-form/react-hook-form` | object | *optional*  | returned by `useForm()` hook. |
| `onSubmit` | `@concrete-form/react-hook-form` | function | *optional* | React hook form onsubmit callback. Handled by  |
| `formProps` | `@concrete-form/core` | object | *optional* | props for the `<form>` element |
| `noValidate` | `@concrete-form/core` | boolean | *optional* | shorthand `formProps` for `novalidate` (default = `true`) |
| `{...config}` | `@concrete-form/core` |  | *optional* | **Concrete Form** configs (check doc) |

<br />

# Get started
## Initialize your form

You can :
1) Create your form normally with `useForm` (**recommended**)
2) Let **Concrete Form** initialize it for you with default settings

If you create the form yourself, don't forget to pass the result of `useForm` like this :

```jsx
const form = useForm({ ... })
return <Form form={form} />
```

## Result

- render a `<form />` element.
- render a **React hook form** [`FormProvider`](https://react-hook-form.com/api/useformcontext) so you can use [`useFormContext`](https://react-hook-form.com/api/useformcontext)
- **React hook form** will call `onSubmit` if provided

## Usage
- You can use any **Concrete form** UI element inside `<Form />`
- You can use your own controls (check [**React hook form**](https://react-hook-form.com/api) doc)