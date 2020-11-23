import { useEffect } from "react";
import NavBar from "../../components/NavBar";
import AdminRoute from "../../components/auth/AdminRoute"
import { useAuth } from "../../context/auth";
import SideBar from "../../components/admin/SideBar";
import MainContent from "../../components/admin/MainContent";

function index() {
  const { user } = useAuth();
  return (
    <AdminRoute>
      <NavBar />
        <div className="flex py-4 justify-between container mx-auto">
        <div className="md:w-1/4">
        <SideBar/>
        </div>
        <div className="md:w-2/3">
          <MainContent/>
        </div>
        </div>
      {/* <div onClick={()=>console.log(user)}>Click Me</div> */}
    </AdminRoute>
  );
}

export default index;
