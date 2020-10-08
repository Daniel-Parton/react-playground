import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useToasts } from 'react-toast-notifications';

import { nameOf } from '../../../helpers/object-helper';
import ToastHelper from '../../../helpers/toast-helper';
import DashboardPage from '../../hoc/dashboard-page';
import { AutoForm, CardSimple } from '../../shared';
import { email, matchField, maxCharLength, required } from '../../shared/form/validators';

interface LoginFormProps extends RouteComponentProps {
}

interface RegisterFormValues {
  firstName: string
  lastName: string
  mobile: string
  email: string
  password: string
  passwordConfirm: string
}

const LoginForm: React.FC<LoginFormProps> = (props) => {

  const toastHelper = new ToastHelper(useToasts());

  return (
    <CardSimple container extraPadding maxWidth={750}>
      <AutoForm<RegisterFormValues, RegisterFormValues>
        rows={[
          {
            columns: [
              { largeSize: 6, field: { name: 'firstName', type: 'TextInput', display: 'First name', options: { validators: [required(), maxCharLength(100)] } } },
              { largeSize: 6, field: { name: 'lastName', type: 'TextInput', display: 'Last name', options: { validators: [required(), maxCharLength(100)] } } }
            ]
          },
          {
            columns: [
              { largeSize: 6, field: { name: 'mobile', type: 'MobilePhone', display: 'Mobile', options: { validators: [required(), maxCharLength(100)] } } },
              { largeSize: 6, field: { name: 'email', type: 'TextInput', display: 'Email', options: { validators: [required(), email(), maxCharLength(200)] } } },
            ]
          },
          { columns: [{ field: { name: 'password', type: 'PasswordInput', display: 'Password', options: { validators: [required(), maxCharLength(20)] } } }] },
          { columns: [{ field: { name: 'passwordConfirm', type: 'PasswordInput', display: 'Password confirm', options: { validators: [matchField(nameOf<RegisterFormValues>('password'))] } } }] }
        ]}
        onSubmitPromise={v => Promise.resolve(v)}
        onSubmitSuccess={() => toastHelper.success('Register Success!')}
        hideBack
        submitButtonText='Register'
        toastOnValidationError
        toastValidationErrorMessage='Whoopsy!'
        noFocusOnInit
      />
    </CardSimple>
  );
}

export default DashboardPage(LoginForm);
