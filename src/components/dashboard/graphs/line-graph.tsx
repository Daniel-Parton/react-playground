import React from 'react';
import { RouteComponentProps } from 'react-router';
import { CardSimple, LineGraph } from '../../shared';

import DashboardPage from '../../hoc/dashboard-page';

interface LineGraphPageProps extends RouteComponentProps { }

const LineGraphPage: React.FC<LineGraphPageProps> = (props) => {

  return (
    <CardSimple>
      <LineGraph
        showLegend
        series={[
          {
            id: 'Dataset 1', data: [
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 4 },
              { x: 5, y: 5 },
              { x: 6, y: 6 },
              { x: 7, y: 7 },
              { x: 8, y: 8 },
              { x: 9, y: 9 },
              { x: 10, y: 10 },
            ]
          },
          {
            id: 'Dataset 2', data: [
              { x: 1, y: 10 },
              { x: 2, y: 9 },
              { x: 3, y: 8 },
              { x: 4, y: 7 },
              { x: 5, y: 6 },
              { x: 6, y: 5 },
              { x: 7, y: 4 },
              { x: 8, y: 3 },
              { x: 9, y: 2 },
              { x: 10, y: 1 },
            ]
          },
        ]}
      />
    </CardSimple>

  );
}

export default DashboardPage(LineGraphPage);
