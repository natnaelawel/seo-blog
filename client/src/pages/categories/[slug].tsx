import React from "react";
import { getCategories, getCategory, getCategoryBlogs } from "../../actions/category";
import BaseLayout from "../../components/Layout/BaseLayout";
import SingleCategory from "../../components/user/Category/SingleCategory";
import { IBlog, ICategory } from "../../utils/interfaces";

interface propsType {
    category: ICategory,
    blogs: IBlog[]
}

function ShowCategory({category,blogs }: propsType) {
  return (
    <BaseLayout>
      <SingleCategory blogs={blogs} category={category} />
    </BaseLayout>
  );
}

export async function getStaticPaths() {
  const categories: ICategory[] = await getCategories();
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const {category, blogs}: propsType = await getCategoryBlogs(params.slug);
  return { props: { category, blogs } };
} 

export default ShowCategory;
