import React from 'react';
import { RouteComponentProps } from 'react-router';
import { TabPages } from '../../shared';
import LineGraph from './line-graph';

interface GraphsPageProps extends RouteComponentProps {
}

const GraphsPage: React.FC<GraphsPageProps> = (props) => {

  const { match: { path } } = props;

  return (
    <TabPages
      redirectFromBase
      tabs={[
        { label: 'Line Graph', link: `${path}/line`, component: LineGraph, exact: true },
      ]}
    />
  );
}

export default GraphsPage;
