# Doc (first draft)

# `<Form />`
```jsx
import { Form } from '@concrete-form/react-hook-form'

const Example = () => {
  return <Form values={} onSubmit={} {...} />
}
```
**RHF** = Reack Hook Form
## Props

  - values
  - onSubmit
  - ... all props supported by **RHF** `useForm(...)`*

> except "defaultValue" wich is defined as `values`

https://react-hook-form.com/api/useform/

> **Note:** If you change the `values` prop, **RHF** `reset()` method will be called internally to reset the cached values.