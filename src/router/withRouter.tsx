import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * 解决使用类组件时无法使用路由功能
 * @param {T} Component
 * @returns NewComponent
 */
export const withRouter = (Component: any) => {
  function WithRouterPropComponent(props: any) {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return <Component {...props} router={{ location, params, navigate }}></Component>;
  }
  return WithRouterPropComponent;
};
