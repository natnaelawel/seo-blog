import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getPhotoUrl } from "../seo_head/BlogHead";
import SearchBlog from "../user/Blog/SearchBlog";
import { IBlog, ICategory, ITag } from "../../utils/interfaces";
import moment from "moment";
import Truncate from "react-truncate-html";

export default function Home() {
  const [searchResults, setSearchResults] = useState<IBlog[]>(null);
  const [searchTerm, setSearchTerm] = useState<String>("");
//   const [isLoading, setIsLoading] = useState(false);
  const handleSearchResult = (
    blogs: IBlog[],
    searchText: String,
    // isLoading,
    // error
  ) => {
    if (searchText) {
      setSearchResults(blogs);
      setSearchTerm(searchText);
    }
  };
  return (
    <div>
      <SearchBlog
        handleSearchTerm={setSearchTerm}
        handleSearchResult={handleSearchResult}
      />
      <div>
        {/* {isLoading && <h1>Loading</h1>} */}
        {searchTerm && searchResults !== null ? (
          <div>
            <div className="container px-5 pb-5">
              {searchResults && (
                <h1 className="text-4xl font-extrabold">
                  Found {searchResults.length} Results for {searchTerm}
                </h1>
              )}
            </div>
            {searchResults &&
              searchResults.map((blog: IBlog) => (
                <div
                  key={blog._id}
                  className="shadow-lg rounded-xl container p-5 m-5 space-y-5"
                >
                  {}
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
          <div>Home Text</div>
        )}
      </div>
    </div>
  );
}
