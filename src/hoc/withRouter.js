import React from "react";
import { useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => {
  const comp = (props) => {
    const params = useParams();

    return <WrappedComponent {...props} params={params} />;
  };
  comp.displayName = "withRouterWrapper";
  return comp;
};

export default withRouter;
