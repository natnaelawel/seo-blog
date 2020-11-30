import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useAuth } from "../../context/auth";
import Router from "next/router";
import { isAdmin, isAuthenticated } from "../../actions/auth";

function index({ children }) {
  const { user } = useAuth();
  useEffect(() => {

    const fetchUser = async () => {
      if (user && user.role !== "admin") {
        Router.push("/");
      }
    };
    if (isAuthenticated()) {
      fetchUser();
    } else {
      Router.push("/signin");
    }
  }, [user]);
  return user && children;
}

export default index;

    // const fetchUser = async () => {
    //   console.log("is admin", await isAdmin());
    //   if (await !isAdmin()) {
    //     Router.push("/");
    //   }
    // };