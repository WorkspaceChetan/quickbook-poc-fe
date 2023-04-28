import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const tokenid = localStorage.getItem("tokenid");
  if (tokenid && tokenid.length > 0) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};
export default ProtectedRoute;
