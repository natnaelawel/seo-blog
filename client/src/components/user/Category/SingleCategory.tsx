import Link from "next/link";
import React from "react";
import { IBlog, ICategory, ITag } from "../../../utils/interfaces";
import moment from 'moment'
import Image from 'next/image'
import { getPhotoUrl } from "../../seo_head/BlogHead";
import Truncate from 'react-truncate-html';

interface propsType {
  category: ICategory;
  blogs: IBlog[];
}
function SingleCategory({ category, blogs }: propsType) {
  return (
    <div className="dark:text-white container mx-auto ">
      <h1 className="text-center text-7xl py-5 font-bold">{category.name}</h1>
      <div>
      {blogs &&
          blogs.map((blog: IBlog) => (
            <div key={blog._id} className="shadow-lg rounded-xl container  p-5 m-5 space-y-5">
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
                  <Link href={`/blogs/${blog.slug}`}>
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
                          className="outline-none border-2 hover:bg-blue-500 hover:text-white text-lg border-blue-500 rounded-lg px-4 py-1 m-2"
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
    </div>
  );
}

export default SingleCategory;
