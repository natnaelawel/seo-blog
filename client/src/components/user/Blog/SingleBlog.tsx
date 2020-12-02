import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getPhotoUrl } from "../../seo_head/BlogHead";
import moment from "moment";
import { IBlog, ICategory, ITag } from "../../../utils/interfaces";
import { getRelatedBlogs } from "../../../actions/blog";
import Truncate from "react-truncate-html";
import Link from "next/link";

function SingleBlog({ blog }: ISingleBlogType) {
  const [relatedBlogs, setrelatedBlogs] = useState<IBlog[] | null>([]);
  useEffect(() => {
    const fetchData = async () => {
      setrelatedBlogs(await getRelatedBlogs(blog.slug));
    };
    fetchData();
  }, [blog]);
  return (
    <div className="">
      <div className="relative object-cover" style={{ minHeight: "60vh" }}>
        <Image
          src={getPhotoUrl(blog.photo)}
          objectPosition="center"
          className="relative"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="px-10">
        <div className="flex relative">
          <div className="w-3/4 overflow-auto px-6 text-2xl">
            <h1 className="text-5xl font-bold p-10">{blog.title}</h1>
            <div className="p-5 text-lg font-bold bg-yellow-100">
              Written by {blog.posted_by.name}| published{" "}
              {moment(blog.updatedAt).fromNow()}
            </div>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: blog.body.toString() }}
            />
          </div>
          <div className="w-1/4  sticky top-0 right-0 max-h-screen">
            <ul className="h-80">
              <h2 className="text-3xl text-center my-4 font-semibold">
                Categories
              </h2>
              {blog.categories.map((category: ICategory) => (
                <li key={category._id} className="shadow-lg px-5 py-5 mx-4 my-2 text-lg">
                  {category.name}
                </li>
              ))}
            </ul>
            <hr />
            <ul>
              <h2 className="text-3xl text-center my-4 font-semibold">Tags</h2>

              {blog.tags.map((tag: ITag) => (
                <li key={tag._id} className="shadow-lg px-5 py-5 mx-4 my-2 text-lg">
                  {tag.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-10 container">
          <h1 className="my-4 text-3xl font-semibold">Related Blogs</h1>
          {relatedBlogs &&
            relatedBlogs.map((blog) => (
              <Link href={`/blogs/${blog.slug}`}>
                <a>
                  <div className="shadow-lg py-5 px-4 text-lg flex space-x-4">
                    <Image
                      src={getPhotoUrl(blog.photo)}
                      width={250}
                      height={200}
                      objectFit="cover"
                    />
                    <div className="w-full p-5 flex flex-col justify-between">
                      <div className="font-semibold text-2xl capitalize flex justify-between ">
                        <h3>{blog.title}</h3>
                        <span>
                          Written by
                          <Link href={`/profile/${blog.posted_by.profile}`}>
                            <a className="text-blue-400">{blog.posted_by.name}</a>
                          </Link>
                        </span>
                      </div>
                      <Truncate
                        style={{ fontSize: "18px" }}
                        lines={5}
                        dangerouslySetInnerHTML={{
                          __html: blog.body,
                        }}
                      />
                      <button className="self-end text-center mx-1 border-blue-500 border-2 hover:bg-blue-600 hover:text-white outline-none text-blue-500 text-lg rounded-lg px-2 py-1">
                        Read More
                      </button>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

interface ISingleBlogType {
  blog: IBlog;
}

export default SingleBlog;
