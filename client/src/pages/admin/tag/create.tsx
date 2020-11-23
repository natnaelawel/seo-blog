import { useEffect } from "react";
import NavBar from "../../../components/NavBar";
import AdminRoute from "../../../components/auth/AdminRoute"
import CreateTag from "../../../components/admin/Tag/CreateTag";

function create() {
  return (
    <div>
      <AdminRoute>
        <NavBar />
        <CreateTag/>
      </AdminRoute>
    </div>
  );
}

export default create;
