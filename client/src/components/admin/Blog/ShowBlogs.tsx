import Link from "next/link";
import React, { useEffect, useState } from "react";
import { deleteBlog } from "../../../actions/blog";
import { IBlog } from "../../../utils/interfaces";
import DeleteConfirmation from "../../confirmation/DeleteConfirmation";

function ShowBlogs({ blogs: blogsData }: IPropsType) {
  const [success, setSuccess] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isDeleting, setisDeleting] = useState(false);
  const [slugToDelete, setslugToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteBlog(slugToDelete);
      setBlogs(blogs.filter((blog) => blog.slug !== slugToDelete));
      setSuccess({ message: "Blog Has Been Deleted successfully" });
      setRefetch(!refetch);
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (error) {
      setError({ message: "Something goes wrong please try again" });
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    setslugToDelete(null);
  };

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  const confirmDelete = (slug: String) => {
    setslugToDelete(slug);
  };
  return (
    <div className="w-2/3 mx-auto py-10 ">
      {slugToDelete && (
        <div className="absolute top-0 left-0 z-50 mx-auto min-h-screen min-w-full bg-gray-800 bg-opacity-50">
          <DeleteConfirmation
            message="Are You Sure You Want to Delete?"
            handleDelete={handleDelete}
            handleCancel={() => setslugToDelete(null)}
          />
        </div>
      )}
      {success && (
        <div className="absolute z-50 top-4 animate-bounce right-0 p-4 rounded-xl border-2 border-gray-400 bg-green-400 text-white font-bold text-xl">
          {success.message}
        </div>
      )}
      {error && (
        <div className="absolute z-50 top-4 animate-bounce right-0 p-4 rounded-xl border-2 border-gray-400 bg-red-400 text-white font-bold text-xl">
          {error.message}
        </div>
      )}
      <div className="flex justify-between items-center bg-gray-800 text-white py-3 px-8 text-2xl">
        <h1>Manage Blogs</h1>
        <Link href="blogs/create">
          <a className="outline-none text-white bg-green-500 hover:text-white text-lg  rounded-lg px-6 py-2 m-2">
            Create Blog
          </a>
        </Link>
      </div>

      {blogs &&
        blogs.map((blog, index) => (
          <div key={blog._id} className="py-3  border-b-2">
            <div className="p-3 flex w-full ">
              <div className=" flex flex-1 justify-self-start">
                <span className="font-extrabold px-2 mx-2">{index + 1}</span>
                <h1>
                  {blog.title}
                  <br />
                  <p>Posted By {blog.posted_by.name}</p>
                </h1>
              </div>
              <div className="justify-self-end place-self-end ">
                <Link href={`blogs/${blog.slug}/edit`}>
                  <a className="px-4 py-1 mx-1 bg-blue-500 rounded-md text-white  focus:outline-none outline-none">
                    Edit
                  </a>
                </Link>
                <a
                  onClick={() => confirmDelete(blog.slug)}
                  className="cursor-pointer px-4 py-1 mx-1 bg-red-500 rounded-md text-white  focus:outline-none outline-none"
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
interface IPropsType {
  blogs: IBlog[];
}

export default ShowBlogs;
