import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import Truncate from "react-truncate-html";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { getPhotoUrl } from "../../seo_head/BlogHead";
import { IBlog, ICategory, ITag } from "../../../utils/interfaces";
import SearchBlog from "./SearchBlog";
import { useState } from "react";
// import { useQuery } from "react-query"
// import { getBlogsWithCategoriesAndTags } from "../../../actions/blog"
function BlogsList({ blogs, categories, tags, size }: IPropsType) {
  // const blogsCategoriesTags = useQuery('blogs' , getBlogsWithCategoriesAndTags, {});
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([]);
  const head = () => {
    return (
      <Head>
        <title>Programming blogs | {process.env.NEXT_APP_NAME}</title>
        <meta
          name=""
          content="Programming blogs tutorials on react node next js vue php laravel and web development"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_DOMAIN}/${router.pathname}`}
        />
        <meta
          property="og:title"
          content={`Latest Web Development Tutorials | ${process.env.NEXT_APP_NAME}`}
        />
        <meta
          property="og:description"
          content="Programming blogs tutorials on react node next js vue php laravel and web development"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_DOMAIN}${router.pathname}`}
        />
        <meta property="og:site_name" content={process.env.NEXT_APP_NAME} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_DOMAIN}/image-upload.svg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.NEXT_DOMAIN}/image-upload.svg`}
        />
        <meta property="og:image:type" content="image/svg" />
        <meta property="fb:app_id" content={process.env.NEXT_FB_APP_ID} />
      </Head>
    );
  };

  const handleSearchResult= (blogs: IBlog[], searchText: String)=>{
    if(searchText){
      setSearchResult(blogs)
    }
  }


  return (
    <div>
      {head()}
      <SearchBlog handleSearchResult={handleSearchResult} />
      {(searchResult.length <= 0) ? (
        <div className="container mx-auto ">
          <h1 className="text-6xl font-bold p-6 text-center m-6">
            Programming blogs and tutorials
          </h1>
          <div className="text-center">
            <div className="my-4 py-3">
              {categories &&
                categories.map((category: ICategory) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                  >
                    <a className="mx-1 border-blue-500  bg-blue-600 text-white outline-none text-lg rounded-lg px-6 py-3 my-5">
                      {category.name}
                    </a>
                  </Link>
                ))}
            </div>
            <div className="my-4 py-3">
              {tags &&
                tags.map((tag: ITag) => (
                  <Link key={tag._id} href={`/tags/${tag.slug}`}>
                    <a className="border-2 mx-1 border-blue-500  hover:bg-blue-600 hover:text-white outline-none text-blue-500 text-lg rounded-lg px-6 py-3 my-5">
                      {tag.name}
                    </a>
                  </Link>
                ))}
            </div>
          </div>
          {blogs &&
            blogs.map((blog: IBlog) => (
              <div
                key={blog._id}
                className="shadow-lg rounded-xl container  p-5 m-5 space-y-5"
              >
                <div className="container flex space-x-5">
                  <div className="  object-cover flex-1/3">
                    <Image
                      alt="Next.js logo"
                      className="object-cover flex-1 w-full min-w-full"
                      src={getPhotoUrl(blog.photo)}
                      width={500}
                      height={300}
                    />
                  </div>

                  <div className="flex flex-col justify-between items-stretch flex-2/3">
                    <Link href={`blogs/${blog.slug}`}>
                      <a className="text-4xl my-3 font-bold ">{blog.title}</a>
                    </Link>
                    <h2 className="text-2xl my-3 bg-gray-100 p-5">
                      Written BY {blog.posted_by.name} | published{" "}
                      {moment(blog.updatedAt).fromNow()}
                    </h2>

                    <Truncate
                      style={{ fontSize: "18px" }}
                      lines={5}
                      dangerouslySetInnerHTML={{
                        __html: blog.body,
                      }}
                    />
                    <div className="self-end place-self-end">
                      <button className="bg-blue-500 hover:bg-blue-600 outline-none text-white text-lg rounded-lg px-4 py-2 my-5">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {blog.categories &&
                      blog.categories.map((category: ICategory) => (
                        <button
                          key={category._id}
                          className="outline-none bg-blue-500 text-white text-lg border-blue-500 rounded-lg px-4 py-1 m-2"
                        >
                          {category.name}
                        </button>
                      ))}
                  </div>
                  <div>
                    {blog.tags &&
                      blog.tags.map((tag: ITag) => {
                        return (
                          <button
                            key={tag._id}
                            className="outline-none hover:bg-blue-500 hover:text-white text-lg border-blue-500 rounded-lg px-4 py-1 m-2"
                          >
                            {tag.name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div>
          {searchResult &&
            searchResult.map((blog: IBlog) => (
              <div
                key={blog._id}
                className="shadow-lg rounded-xl container  p-5 m-5 space-y-5"
              >
                <div className="container flex space-x-5">
                  <div className="  object-cover flex-1/3">
                    <Image
                      alt="Next.js logo"
                      className="object-cover flex-1 w-full min-w-full"
                      src={getPhotoUrl(blog.photo)}
                      width={500}
                      height={300}
                    />
                  </div>

                  <div className="flex flex-col justify-between items-stretch flex-2/3">
                    <Link href={`blogs/${blog.slug}`}>
                      <a className="text-4xl my-3 font-bold ">{blog.title}</a>
                    </Link>
                    <h2 className="text-2xl my-3 bg-gray-100 p-5">
                      Written BY {blog.posted_by.name} | published{" "}
                      {moment(blog.updatedAt).fromNow()}
                    </h2>

                    <Truncate
                      style={{ fontSize: "18px" }}
                      lines={5}
                      dangerouslySetInnerHTML={{
                        __html: blog.body,
                      }}
                    />
                    <div className="self-end place-self-end">
                      <button className="bg-blue-500 hover:bg-blue-600 outline-none text-white text-lg rounded-lg px-4 py-2 my-5">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {blog.categories &&
                      blog.categories.map((category: ICategory) => (
                        <button
                          key={category._id}
                          className="outline-none bg-blue-500 text-white text-lg border-blue-500 rounded-lg px-4 py-1 m-2"
                        >
                          {category.name}
                        </button>
                      ))}
                  </div>
                  <div>
                    {blog.tags &&
                      blog.tags.map((tag: ITag) => {
                        return (
                          <button
                            key={tag._id}
                            className="outline-none hover:bg-blue-500 hover:text-white text-lg border-blue-500 rounded-lg px-4 py-1 m-2"
                          >
                            {tag.name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              
              </div>
            
            ))}
        </div>
      )}
    </div>
  );
}

interface IPropsType {
  blogs: IBlog[];
  categories: ICategory[];
  tags: ITag[];
  size: Number | any;
}

export default BlogsList;
