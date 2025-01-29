import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authThunk";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <form className=" w-[70%]" onSubmit={handleOnSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
            <Mail size={20} />
          </div>
          <Input
            className="h-12 pl-9"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleInputOnChange}
          />
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
            <KeyRound size={20} />
          </div>
          <Input
            className="h-12 pl-9"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleInputOnChange}
          />
        </div>
      </div>
      <Button className="w-full mt-5">Login</Button>
    </form>
  );
};

export default LoginForm;
