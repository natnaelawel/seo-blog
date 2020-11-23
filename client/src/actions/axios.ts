import axios from "axios";
import cookie from "js-cookie";
const url = process.env.NEXT_PUBLIC_BACKEND_URI;
let token = "some token";
if (process.browser) {
  const token = cookie.get("token");
  // return getUser(token);
}

export default axios.create({
  baseURL: url,
  headers: { Authorization: `Bearer ${cookie.get("token")}` },
});
