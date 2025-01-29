import React from "react";
import Login from "./pages/Login";
import Layout from "./components/Sidebar/Layout";
import { Route, Routes, Navigate } from "react-router";
import ManagerRoute from "./guards/ManagerRoute";
import EmployeeRoute from "./guards/EmployeeRoute";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "./features/auth/authThunk";
import { getToken } from "./utils/tokenHelper";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (getToken()) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <Routes>
      {!user && !getToken() ? (
        // Show Login at root path "/"
        <Route path="/" element={<Login />} />
      ) : (
        // Render authenticated layout and preserve the current path
        <Route path="/" element={<Layout />}>
          <Route path="manager/*" element={<ManagerRoute />} />
          <Route path="employee/*" element={<EmployeeRoute />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
