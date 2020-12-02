import axios from "./axios";
import cookie from "js-cookie";
import querystring from "query-string"
// import { getCookieParser } from "next/dist/next-server/server/api-utils";

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
    const {data} = await axios.post('blogs/blogs-categories-tags')
    return data;
  } catch (error) {return error.response.data}
};

export const getBlogs = async ()=>{
  try {
    const {data} = await axios.get('blogs')
    return data;
  } catch (error) {return error.response.data}
}

export const getSearchResult = async (searchQuery)=>{
  console.log('searchQuery i s', searchQuery)
  const search_query = querystring.stringify(searchQuery)
  try {
    const {data} = await axios.get(`blogs/search?${search_query}`)
    return data;
  } catch (error) {
    return error.response.data
  }
}

export const getBlog = async (slug:String)=>{
  try {
    const {data} = await axios.get('blogs/'+ slug)

    return data;
  } catch (error) {return error.response.data}
}

export const updateBlog = async (
  slug: string,
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
    const { data } = await axios.put(`/blogs/${slug}`, formData, {
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

export const getRelatedBlogs = async (slug:String)=>{
  try {
    const {data} = await axios.get(`blogs/${slug}/related`)
    return data;
  } catch (error) {return error.response.data}
}

export const deleteBlog = async (slug: String) =>{
  try {
    const {data} = await axios.delete(`blogs/${slug}`)
    return data
  } catch (error) {
    return error.response.data
  }
}

    // let token;
    // if (window !== undefined) {
    //   token = cookie.get("token");
    //   console.log("token is ", token);
    // }
    // console.log("context is ", ctx.req.cookies.headers);
    // const { data: blogsCategoriesTags } = await axios.post(
      // "http://localhost:8383/api/blogs/blogs-categories-tags",
      // { skip: 1, limit: 1 },
      // {
        // headers: ctx.req ? { cookie: ctx.req.headers.cookie.split("=")[1] } : undefined
        // headers: {
        //   Authorization: ctx.req
        //     ? ctx.req.headers.cookie.split("=")[1]
        //     : undefined,
        // },
      // }
    // );