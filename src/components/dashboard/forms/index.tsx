import React from 'react';
import { RouteComponentProps } from 'react-router';
import DashboardPage from '../../hoc/dashboard-page';

interface FormsPageProps extends RouteComponentProps {
}

const FormsPage: React.FC<FormsPageProps> = (props) => {

  const { match: { path } } = props;

  return <div>Forms</div>;
}

export default DashboardPage(FormsPage);
