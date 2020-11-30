import { useEffect } from "react";
import NavBar from "../../../../components/NavBar/NavBar";
import AdminRoute from "../../../../components/auth/AdminRoute";
import CreateBlog from "../../../../components/admin/Blog/CreateBlog";
import { IBlog } from "../../../../utils/interfaces";
import { getBlog, getBlogs } from "../../../../actions/blog";

function index({ blog }: propsType) {
  return (
    <div>
      <AdminRoute>
        <NavBar />
        <CreateBlog blog={blog} />
      </AdminRoute>
    </div>
  );
}

export async function getStaticPaths() {
  const blogs = await getBlogs();
  const paths = blogs.map((blog: IBlog) => ({
    params: { slug: blog.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blog: IBlog = await getBlog(params.slug);
  return { props: { blog } };
}

interface propsType {
  blog: IBlog;
}

export default index;
