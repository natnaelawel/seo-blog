import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import Router from "next/router";
import { isAuthenticated } from "../../actions/auth";

function index({ children }) {
  const { user } = useAuth();
  useEffect(() => {
    if (!isAuthenticated()) {
      Router.push("/signin");
    }
  }, []);
  return user && children;
}

export default index;
