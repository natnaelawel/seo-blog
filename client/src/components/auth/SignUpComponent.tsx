import React, { useState } from "react";
import classnames from "classnames";
import { signUp } from "../../actions/auth";
import Link from "next/link";
function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signUp(name, username, email, password);
      if (data.error) {
        setError(data.error);
      } else {
        console.log("data is ", data);
        setSuccess(data.message);
      }
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto h-full py-10">
      <section className="shadow-md py-8 px-8 sm:px-6 space-y-6 lg:w-1/3 sm:w-2/3 lg:h-1/2 mx-auto">
        <header className="col-start-3 flex items-center justify-between">
          <h1 className="text-4xl">Sign Up</h1>
        </header>
        {success && !error && (
          <div className="bg-green-300 rounded-lg p-4">
            <h1>
              {success}{" "}
              <Link href="/signin">
                <a className="text-lg underline text-white font-bold">Login</a>
              </Link>
            </h1>
          </div>
        )}
        {error && !success && (
          <div className="bg-red-200 rounded-lg p-4">
            <h1>{error}</h1>
          </div>
        )}
        {!success && (
          <form
            onSubmit={handleSubmit}
            className="col-start-3 justify-center flex flex-col space-y-6"
          >
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
              type="text"
              required
              aria-label="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
              type="text"
              aria-label="username"
              required
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
              type="email"
              required
              aria-label="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
              type="password"
              aria-label="email"
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className={classnames(
                "outline-none focus:outline-none shadow-md py-4 text-2xl font-bold bg-green-400 text-white rounded-lg hover:bg-green-600 flex justify-center items-center",
                loading && "disabled cursor-not-allowed"
              )}
            >
              <div
                className={classnames(
                  "rounded-full w-7 h-7 mx-2",
                  loading && "loader"
                )}
              ></div>
              Register
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
export default SignUp;
