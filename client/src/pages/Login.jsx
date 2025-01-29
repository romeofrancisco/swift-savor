import React from "react";
import LoginCard from "@/components/Login/LoginCard";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="h-screen flex justify-center items-center">
      <LoginCard />
      {loading && <Loading />}
    </div>
  );
};

export default Login;
