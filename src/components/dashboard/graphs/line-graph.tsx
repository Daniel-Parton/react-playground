import React from 'react';
import { RouteComponentProps } from 'react-router';

import DashboardPage from '../../hoc/dashboard-page';

interface LineGraphPageProps extends RouteComponentProps { }

const LineGraphPage: React.FC<LineGraphPageProps> = (props) => {

  return (
    <div />
  );
}

export default DashboardPage(LineGraphPage);
