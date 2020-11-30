import { useRouter } from "next/router";
import React from "react";
import { getBlog, getBlogs } from "../../actions/blog";
import SingleBlog from "../../components/user/Blog/SingleBlog";
import BaseLayout from "../../components/Layout/BaseLayout";
import { BlogHead } from "../../components/seo_head/BlogHead";
import { IBlog } from "../../utils/interfaces";
function SingleBlogPage(props:any) {
  const router = useRouter();
  const blog:IBlog = props.blog
  return (
    <BaseLayout>
      {BlogHead(blog, router)}
      <SingleBlog blog={blog} />
    </BaseLayout>
  );
}

export async function getStaticPaths() {
  const blogs = await getBlogs();
  // Get the paths we want to pre-render based on blogs
  const paths = blogs.map((blog:IBlog) => ({
    params: { slug: blog.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the blug slug`.
  // If the route is like /blog/1, then params.slug is 1
  const blog:IBlog = await getBlog(params.slug);

  // Pass blog data to the page via props
  return { props: { blog } };
}
export default SingleBlogPage;
