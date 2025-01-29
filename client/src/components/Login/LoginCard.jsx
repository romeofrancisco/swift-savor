import React from "react";
import { Card } from "../ui/card";
import { CardTitle } from "../ui/card";
import { CardDescription } from "../ui/card";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <Card className="w-[85%] h-[80%] flex z-50">
      <div className="login-image">
        <CardTitle className="font-bold text-white z-50 text-5xl md:text-7xl">
          Swift<span className="text-primary">Savor</span>
        </CardTitle>
        <CardDescription className="text-white z-50 text-center text-[1rem] md:text-[1.4rem]">
          Efficient Sales, Inventory and Employee Management
        </CardDescription>
      </div>
      <div className="w-[40%] center">
        <h1 className="font-bold text-4xl mb-10">Login</h1>
        <LoginForm/>
      </div>
    </Card>
  );
};

export default LoginCard;
