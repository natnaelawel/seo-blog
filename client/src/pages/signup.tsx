import { useEffect } from "react";
import { isAuthenticated } from "../actions/auth";
import SignUp from "../components/auth/SignUpComponent";
import NavBar from "../components/NavBar";
import Router from "next/router";

export default function Home() {
  useEffect(() => {
    if (isAuthenticated()) {
      Router.push("/");
    }
  }, []);

  return !isAuthenticated() ? (
    <div className="dark:text-white mx-auto">
      <NavBar />
      <SignUp />
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
