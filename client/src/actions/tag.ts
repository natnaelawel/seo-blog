import axios from "./axios";

export const getTag = async (slug: String) => {
  try {
    const { data } = await axios.get(`/tags/${slug}`);
    if (data) {
      return data;
    }
  } catch (error) {
    return { error };
  }
};

export const getTags = async () => {
  try {
    const { data } = await axios.get("/tags");
    if (data) {
      return data;
    }
  } catch (error) {
    return { error };
  }
};

export const getTagBlogs = async (slug: String) => {
  try {
    const { data } = await axios.get(`/tags/${slug}/blogs`);
    if (data) {
      return data;
    }
  } catch (error) {
    return { error };
  }
};


export const createTag = async (name: String) => {
  try {
    const { data } = await axios.post("/tags", { name });
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTag = async (slug: String) => {
  try {
    const { data } = await axios.delete(`/tags/${slug}`);
    if (data) {
      return data;
    }
  } catch (error) {
    return { error };
  }
};
