import axios from "./axios";
import cookie from "js-cookie";
export const createBlog = async (
  title: string,
  body: string,
  file: any,
  checked_categories: any[],
  checked_tags: any[]
) => {
  const categories = checked_categories.join(",");
  const tags = checked_tags.join(",");
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("file", file);
    formData.append("categories", categories);
    formData.append("tags", tags);
    const { data } = await axios.post(
      "/blogs",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    return data;
  } catch (error) {
      return error.response.data
  }
  console.log("There is an erro");
};
