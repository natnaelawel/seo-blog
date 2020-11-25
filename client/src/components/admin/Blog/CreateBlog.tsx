import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../../actions/category";
import { createBlog } from "../../../actions/blog";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { getTags } from "../../../actions/tag";
//  import ReactQuill from "react-quill"; // Typescript
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import {formats, modules} from '../../../helpers/quill';
function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState({
    preview: "/image-upload.svg",
    raw: null,
  });
  const [refetch, setRefetch] = useState(false);
  const uploadRef = useRef(null);

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createBlog(
        title,
        body,
        image.raw,
        checkedCategories,
        checkedTags
      );
      if (data.error) {
        const message = data.error.includes("name already exists")
          ? "Name Already Exists try different name"
          : data.error;
        setError({ message });
        setTimeout(() => {
          setError(null);
        }, 2000);
        setLoading(false);

        return;
      }
      setSuccess({ message: "Category created successfully" });
      setRefetch(!refetch);
      setTitle("");
      setBody("");
      setCheckedCategories([]), setCheckedTags([]);
      setImage({ ...image, raw: null });
      localStorage.removeItem("blog_body");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (error) {
      console.log(error);
      setError({ message: "something goes wrong on creating category" });
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    setLoading(false);
  };

  const handleToggle = (id, type) => {
    if (type === "categories") {
      if (checkedCategories.indexOf(id) !== -1) {
        setCheckedCategories(checkedCategories.filter((c) => c !== id));
      } else {
        setCheckedCategories([...checkedCategories, id]);
      }
    } else if (type === "tags") {
      if (checkedTags.indexOf(id) !== -1) {
        setCheckedTags(checkedTags.filter((c) => c !== id));
      } else {
        const updated = [...checkedTags, id];
        setCheckedTags(updated);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const [categories_data, tags_data] = await Promise.all([
        getCategories(),
        getTags(),
      ]);
      setCategories(categories_data);
      setTags(tags_data);
    };
    try {
      fetchData();
    } catch (error) {}
  }, [refetch]);

  const handleFileInput = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    const blog = JSON.parse(localStorage.getItem("blog_body"));
    if (blog) {
      setBody(blog);
    }
  }, []);
  const handleBody = (data: string) => {
    setBody(data);
    if (window !== undefined) {
      window.localStorage.setItem("blog_body", JSON.stringify(body));
    }
  };
  return (
    <div className="relative container mx-auto px-10">
      <h1 className="text-2xl font-bold py-4">Create Blog</h1>
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
      <form
        onSubmit={handleSubmit}
        className="justify-center flex space-x-10 container mx-auto min-h-screen py-4"
      >
        <div className="left_form sm:w-2/3 lg:w-2/3 mx-auto space-y-4">
          <div className="flex flex-col justify-around py-5 ">
            <div>
              <input
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-3"
                type="text"
                aria-label="Title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="object-contain py-5">
              <ReactQuill
                className="min-h-full h-56 my-5"
                placeholder="Write something here... "
                modules={modules}
                formats={formats}
                style={{}}
                value={body}
                onChange={handleBody}
              />
            </div>
          </div>
        <div className="my-4 py-5">
        <button
            type="submit"
            className={classnames(
              "px-8 outline-none focus:outline-none shadow-md py-4 text-2xl font-bold bg-green-400 text-white rounded-lg hover:bg-green-600 flex justify-center items-center",
              loading && "disabled cursor-not-allowed"
            )}
          >
            {loading && (
              <div
                className={classnames(
                  "rounded-full w-7 h-7 mx-2",
                  loading && "loader"
                )}
              ></div>
            )}
            Create
          </button>
        </div>
        </div>

        <div className="sm:w-1/4">
          <div className="relative cursor-pointer border-2 rounded-lg border-gray-200 px-4 py-3 flex flex-col justify-center">
            {image.raw && (
              <div className="self-center rounded-full p-3">
                <img
                  className="object-cover"
                  src={image.preview}
                  alt="preview Image"
                  width={150}
                  height={200}
                />
              </div>
            )}
            <div className={`flex items-center`} onClick={handleFileInput}>
              <img
                src="/image-upload.svg"
                alt="preview Image"
                width="50"
                height="50"
              />
              <span className="text-lg mx-3">No File Choosen</span>
            </div>

            <input
              ref={uploadRef}
              className="opacity-0 overflow-hidden absolute focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-3 pl-10"
              type="file"
              multiple={false}
              accept="image/*"
              aria-label="name"
              placeholder="Enter category name"
              onChange={handleChange}
            />
          </div>

          <div className="my-5">
            <h1 className="font-bold text-3xl">Categories</h1>
            <div className="my-4 grid grid-flow-row grid-cols-4">
              {categories &&
                categories.map((category, index) => (
                  <div key={category._id} className="flex items-center">
                    <input
                      id={category._id}
                      className="mx-2 text-xl font-semibold"
                      type="checkbox"
                      checked={checkedCategories.includes(category._id)}
                      onChange={(e) => handleToggle(category._id, "categories")}
                    />
                    <label htmlFor={category._id}>{category.name} </label>
                  </div>
                ))}
            </div>
          </div>
          <div className="my-5">
            <h1 className="font-bold text-3xl">Tags</h1>
            <div className="my-4 grid grid-flow-row grid-cols-4">
              {tags &&
                tags.map((tag, index) => (
                  <div key={tag._id} className="flex items-center">
                    <input
                      id={tag._id}
                      className="mx-2 text-xl font-semibold"
                      type="checkbox"
                      checked={checkedTags.includes(tag._id)}
                      onChange={(e) => handleToggle(tag._id, "tags")}
                    />
                    <label htmlFor={tag._id}>{tag.name}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}



export default CreateBlog;
