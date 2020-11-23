import axios from "./axios";

export const getCategory = async (slug: String) => {
  try {
    const { data } = await axios.get(`/categories/${slug}`);
    if (data) {
      return data;
    }
  } catch (error) {
    return { error };
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get("/categories");
    if (data) {
      return data;
    }
  } catch (error) {
    return { error };
  }
};

export const createCategory = async (name: String) => {
  try {
    const { data } = await axios.post("/categories", { name });
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCategory = async (slug: String) => {
  try {
    const { data } = await axios.delete(`/categories/${slug}`);
    if (data) {
      return data;
    }
  } catch (error) {
    return { error };
  }
};
