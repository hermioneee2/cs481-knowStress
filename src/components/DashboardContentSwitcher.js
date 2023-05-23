import React from "react";
// import Dashboard1 from "../dashboardContents/dashboard1";
// import Dashboard2 from "../dashboardContents/dashboard2";
// import Dashboard3 from "../dashboardContents/dashboard3";
// import Dashboard4 from "../dashboardContents/dashboard4";
import Dashboard5 from "../dashboardContents/dashboard5";

const DashboardContentSwitcher = ({ dashboardNum }) => {
  switch (dashboardNum) {
    // case 1:
    //   return <Dashboard1 />;
    // case 2:
    //   return <Dashboard2 />;
    // case 3:
    //   return <Dashboard3 />;
    // case 4:
    //   return <Dashboard4 />;
    case 5:
      return <Dashboard5 />;
    default:
      return null;
  }
};

export default DashboardContentSwitcher;
