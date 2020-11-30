import { useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import AdminRoute from "../../../components/auth/AdminRoute";
import CreateBlog from "../../../components/admin/Blog/CreateBlog";
import ShowBlogs from "../../../components/admin/Blog/ShowBlogs";
import { IBlog } from "../../../utils/interfaces";
import { getBlogs } from "../../../actions/blog";
import BaseLayout from "../../../components/Layout/BaseLayout";

function index({ blogs }: IPropsType) {
  return (
    <div className="relative">
      <AdminRoute>
        <BaseLayout>
          <ShowBlogs blogs={blogs} />
        </BaseLayout>
      </AdminRoute>
    </div>
  );
}
interface IPropsType {
  blogs: IBlog[];
}

export async function getStaticProps() {
  const blogs = await getBlogs();
  return {
    props: {
      blogs,
    },
  };
}

export default index;
