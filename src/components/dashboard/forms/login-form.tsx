import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import ToastHelper from '../../../helpers/toast-helper';

import DashboardPage from '../../hoc/dashboard-page';
import { AutoForm, CardSimple } from '../../shared';
import { email, maxCharLength, required } from '../../shared/form/validators';

interface LoginFormProps extends RouteComponentProps {
}

interface LoginFormValues {
  email: string
  password: string
}

const LoginForm: React.FC<LoginFormProps> = (props) => {

  const toastHelper = new ToastHelper(useToasts());

  return (
    <CardSimple container extraPadding maxWidth={500}>
      <AutoForm<LoginFormValues, LoginFormValues>
        rows={[
          { columns: [{ field: { name: 'email', type: 'TextInput', display: 'Email', options: { validators: [required(), email(), maxCharLength(200)] } } }] },
          { columns: [{ field: { name: 'password', type: 'PasswordInput', display: 'Password', options: { validators: [required(), maxCharLength(200)] } } }] }
        ]}
        onSubmitPromise={v => Promise.resolve(v)}
        onSubmitSuccess={() => toastHelper.success('Login Success!')}
        hideBack
        submitButtonText='Login'
        toastOnValidationError
        toastValidationErrorMessage='Whoopsy!'
      />
    </CardSimple>
  );
}

export default DashboardPage(LoginForm);
