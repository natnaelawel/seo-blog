import { useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import AdminRoute from "../../../components/auth/AdminRoute"
import CreateBlog from "../../../components/admin/Blog/CreateBlog";

function index() {
  return (
    <div>
      <AdminRoute>
        <NavBar />
        <CreateBlog/>
      </AdminRoute>
    </div>
  );
}

export default index;
