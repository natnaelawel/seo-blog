import { useEffect } from "react";
import { isAuthenticated } from "../actions/auth";
import SignIn from "../components/auth/SignInComponent";
import NavBar from "../components/NavBar/NavBar";
import Router from "next/router";
import { useAuth } from "../context/auth";

export default function Home() {
  const { user } = useAuth();
  useEffect(() => {
    if (isAuthenticated()) {
      Router.push("/");
    }
  }, [user]);

  return !isAuthenticated() ? (
    <div className="dark:text-white mx-auto">
      <NavBar />
      <SignIn />
    </div>
  ) : (
    <div></div>
  );
}

// const fetchUser = async () => {
//   console.log(isAdmin(), " iis authenticated");
//   if (await isAdmin()) {
//     Router.push("/admin");
//   } else {
//     if (isAuthenticated()) {
//       Router.push("/user");
//     }
//   }
//   fetchUser();
// };
