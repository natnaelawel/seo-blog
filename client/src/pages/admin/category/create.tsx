import { useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import AdminRoute from "../../../components/auth/AdminRoute"
import CreateCategory from "../../../components/admin/Category/CreateCategory";

function index() {
  return (
    <div>
      <AdminRoute>
        <NavBar />
        <CreateCategory/>
      </AdminRoute>
    </div>
  );
}

export default index;
