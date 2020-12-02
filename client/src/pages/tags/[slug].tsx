import React from "react";
import { getTags, getTag, getTagBlogs } from "../../actions/Tag";
import BaseLayout from "../../components/Layout/BaseLayout";
import SingleTag from "../../components/user/Tag/SingleTag";
import { IBlog, ITag } from "../../utils/interfaces";

interface propsType {
    tag: ITag,
    blogs: IBlog[]
}

function ShowTag({tag,blogs }: propsType) {
  return (
    <BaseLayout>
      <SingleTag blogs={blogs} tag={tag} />
    </BaseLayout>
  );
}

export async function getStaticPaths() {
  const tags: ITag[] = await getTags();
  const paths = tags.map((tag) => ({
    params: { slug: tag.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const {tag, blogs}: propsType = await getTagBlogs(params.slug);
  return { props: { tag, blogs } };
} 

export default ShowTag;
