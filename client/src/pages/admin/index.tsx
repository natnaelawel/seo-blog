import { useEffect } from "react";
import NavBar from "../../components/NavBar";
import AdminRoute from "../../components/auth/AdminRoute"
import { useAuth } from "../../context/auth";

function index() {
  const { user } = useAuth();
  return (
    <AdminRoute>
      <NavBar />
        admin page
      {/* <div onClick={()=>console.log(user)}>Click Me</div> */}
    </AdminRoute>
  );
}

export default index;
