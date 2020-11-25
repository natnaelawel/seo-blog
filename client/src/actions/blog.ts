import axios from "axios";
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
    const { data } = await axios.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBlogsWithCategoriesAndTags = async (ctx) => {
  try {
    let token;
    if (window !== undefined) {
      token = cookie.get("token");
      console.log("token is ", token);
    }
    console.log("context is ", ctx.req.cookies.headers);
    const { data: blogsCategoriesTags } = await axios.post(
      "http://3000/blogs/blogs-categories-tags",
      { skip: 1, limit: 1 },
      {
        // headers: ctx.req ? { cookie: ctx.req.headers.cookie.split("=")[1] } : undefined
        headers: {
          Authorization: ctx.req
            ? ctx.req.headers.cookie.split("=")[1]
            : undefined,
        },
      }
    );
    return blogsCategoriesTags;
  } catch (error) {}
};
