import React from 'react';
import { RouteComponentProps } from 'react-router';

import DashboardPage from '../../hoc/dashboard-page';
import { TabPages } from '../../shared';
import LoginForm from './login-form';
import userRegisterForm from './user-register-form';
import UserRegisterForm from './user-register-form';

interface FormsPageProps extends RouteComponentProps {
}

const FormsPage: React.FC<FormsPageProps> = (props) => {

  const { match: { path } } = props;

  return (
    <TabPages
      redirectFromBase
      tabs={[
        { label: 'Login Form', link: `${path}/login`, component: LoginForm, exact: true },
        { label: 'User Registration', link: `${path}/user-registration`, component: UserRegisterForm, exact: true },
      ]}
    />
  );
}

export default FormsPage;
