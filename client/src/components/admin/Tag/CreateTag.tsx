import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { createTag, deleteTag, getTags } from "../../../actions/tag";

function CreateTag() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createTag(name);
      console.log("success", data);
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
      setSuccess({ message: "tag created successfully!" });
      setRefetch(!refetch);
      setName("");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (error) {
      console.log(error, "error");
      setError({ message: "something goes wrong" });
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTags();
      setTags(data);
    };
    try {
      fetchData();
    } catch (error) {}
  }, [refetch]);

  const handleDelete = async ({ slug }) => {
    try {
      await deleteTag(slug);
      setSuccess({ message: "Category created successfully" });
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
  };
  return (
    <div className="relative container mx-auto px-2">
      <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto py-4">
        <h1 className="text-2xl font-bold py-4">Create Tag</h1>
        <div className="form">
          <form
            onSubmit={handleSubmit}
            className="justify-center flex flex-col space-y-6"
          >
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-3 pl-10"
              type="name"
              aria-label="name"
              placeholder="Enter tag name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className={classnames(
                "outline-none focus:outline-none shadow-md py-4 text-2xl font-bold bg-green-400 text-white rounded-lg hover:bg-green-600 flex justify-center items-center",
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
          </form>
        </div>
      </div>

      <div className="container px-5 mx-auto sm:w-3/4 md:w-2/3 lg:w-1/2">
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
        <h1 className="text-2xl font-bold py-4">Tags</h1>
        {tags &&
          tags.map((tag, index) => (
            <div key={tag._id} className="p-3 border-b-2 flex justify-between">
              <div>
                <span className="font-extrabold px-2 mx-2">{index + 1}</span>{" "}
                {tag.name}
              </div>
              <div>
                <button
                  onClick={() => {
                    handleDelete(tag);
                  }}
                  className="px-4 py-1 mx-1 bg-red-500 rounded-md text-white  focus:outline-none outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreateTag;
