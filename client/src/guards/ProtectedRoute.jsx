import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user } = useSelector((state) => state.auth);

  return allowedRole.includes(user?.role) ? (
    children
  ) : (
    console.log("slow")
  );
};

export default ProtectedRoute;
