import axios from "./axios";
import cookie from "js-cookie";
export const signUp = async (
  name: String,
  username: String,
  email: String,
  password: String
) => {
  try {
    const { data } = await axios.post("/signup", {
      name,
      username,
      email,
      password,
    });
    console.log({ data });
    return data;
  } catch (error) {
    // return Promise.reject
    console.log(error.response.data);
    return error.response.data;
  }
};

export const signIn = async (email: String, password: String) => {
  try {
    const { data } = await axios.post("/signin", { email, password });
    console.log({ data });
    authenticate(data, () => {});
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const signOut = async () => {
  localStorage.removeItem("user");
  cookie.remove("token");
  console.log("signout");
};

export const isAuthenticated = () => {
  if (process.browser) {
    try {
      const cookieChecked = cookie.get("token");
      if (cookieChecked) {
        if (localStorage.getItem("user")) {
          return JSON.parse(localStorage.getItem("user"));
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

export const getUser = () => {
  const getUser = async (token) => {
    try {
      const { data } = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.user;
    } catch (error) {
      return null;
    }
  };
  if (process.browser) {
    const token = cookie.get("token");
    return getUser(token);
  }
};

export const isAdmin = async () => {
  try {
    const user = await getUser();
    if (user.role === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

interface IData {
  user: String;
  token: String;
}
export const authenticate = (data: IData, next: Function) => {
  if (process.browser) {
    window.localStorage.setItem("user", JSON.stringify(data.user));
    cookie.set("token", data.token);
    next();
  }
};
