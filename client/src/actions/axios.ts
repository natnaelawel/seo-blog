import axios from "axios";
import cookie from "js-cookie";
const url = process.env.NEXT_PUBLIC_BACKEND_URI + "/api";
let token = "some token";
if (process.browser) {
  const token = cookie.get("token");
  // return getUser(token);
}
console.log('url is ', url)

export default axios.create({
  baseURL: url,
  headers: { Authorization: `Bearer ${cookie.get("token")}` },
});
