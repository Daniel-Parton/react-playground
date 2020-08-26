import React from "react";

function DashboardPage<P>(Component: React.ComponentType<P>) {
  return function DashboardPageComponent(props: P) {
    return (
      <div className='dashboard-page'>
        <Component {...props} />
      </div>
    );
  }
}

export default DashboardPage;