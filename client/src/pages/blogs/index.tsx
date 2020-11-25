import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { getBlogsWithCategoriesAndTags } from "../../actions/blog";
import BlogList from "../../components/admin/Blog/BlogsList";
import NavBar from "../../components/NavBar";
function Blogs(data) {
  return (
    <div>
      <Head>Blogs Page</Head>

      <NavBar />
      <BlogList  {...data} />
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
    // console.log(, ' is context ')
    const data = await getBlogsWithCategoriesAndTags(context);
    return {
      props: {
        ...data
      }
    }
  }

// Blogs.getInitialProps = async (context) => {
//   try {

//     const data = await getBlogsWithCategoriesAndTags();
//     if (data) {
//       return {
//         ...data,
//       };
//     }
//   } catch (error) {}
// };

export default Blogs;
