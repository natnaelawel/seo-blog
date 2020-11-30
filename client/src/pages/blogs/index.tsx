import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import axios from "../../actions/axios";
import { getBlogsWithCategoriesAndTags } from "../../actions/blog";
import BlogList from "../../components/user/Blog/BlogsList";
import BaseLayout from "../../components/Layout/BaseLayout";
import NavBar from "../../components/NavBar/NavBar";
import { IBlog } from "../../utils/interfaces";
function Blogs({data}) {
  return (
    <BaseLayout>
      <BlogList  {...data} />
    </BaseLayout>
  );
}

export async function getServerSideProps(context) {
  // console.log(context, ' is context ')
    const data:IBlog[] = await getBlogsWithCategoriesAndTags(context);
    return {
      props: {
        data
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
