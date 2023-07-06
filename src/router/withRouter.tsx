import { ComponentClass, FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Location, NavigateFunction, Params } from "react-router-dom";

export type WithRouterProp = {
  router: {
    location: Location;
    params: Readonly<Params<string>>;
    navigate: NavigateFunction;
  };
};
export type WithRouterComponentProp<T> = T & WithRouterProp;

/**
 * 解决使用类组件时无法使用路由功能
 */
export const withRouter = <P, S>(
  RouterComponent: ComponentClass<WithRouterComponentProp<P>, S>
): FC<P> => {
  function WithRouterPropComponent(props: P) {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return <RouterComponent {...props} router={{ location, params, navigate }}></RouterComponent>;
  }
  return WithRouterPropComponent;
};
