export interface BaseFormInput<TFormValues = any> {
  id?: string
  className?: string
  name: keyof TFormValues
  label?: string
  error?: string
  touched?: boolean
  showError?: boolean
  value?: any
}