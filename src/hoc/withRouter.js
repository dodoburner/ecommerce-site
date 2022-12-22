import React from "react";
import { useParams, useLocation } from "react-router-dom";

const withRouter = (WrappedComponent) => {
  const comp = (props) => {
    const params = useParams();
    const location = useLocation();

    return <WrappedComponent {...props} params={params} location={location} />;
  };
  comp.displayName = "withRouterWrapper";
  return comp;
};

export default withRouter;
