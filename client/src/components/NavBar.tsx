import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

import classnames from "classnames";
import { isAuthenticated, signOut } from "../actions/auth";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

function NavBar() {
  const { user } = useAuth();
  const [dark, setDark] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (dark === null) {
      setDark(localStorage.theme === "dark" ? true : false);
    } else {
      localStorage.theme = !dark ? "light" : "dark";
    }
    document.querySelector("html").classList.remove(dark ? "light" : "dark");
    document.querySelector("html").classList.add(!dark ? "light" : "dark");
  }, [dark]);

  const toggleTheme = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDark(!dark);
  };

  const handleSignOut = () => {
    signOut();
    router.replace("/signin");
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-full px-2 sm:px-10 lg:px-16">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a>
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </a>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/blogs">
                  <a className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900">
                    Blogs
                  </a>
                </Link>
                {user && (
                  <Link href={user.role === "admin" ? "/admin" : "/user"}>
                    <a className="px-3 py-2 rounded-md text-sm font-medium text-white">
                      Dashboard
                    </a>
                  </Link>
                )}
                <Link href="">
                  <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                    Contact
                  </a>
                </Link>
                {!isAuthenticated() && (
                  <>
                    <Link href="/signin">
                      <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                        Signin
                      </a>
                    </Link>
                    <Link href="/signup">
                      <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                        Signup
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={toggleTheme}
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              <span className="font-bold">
                {dark ? (
                  <span className="w-32 h-40">🌛</span>
                ) : (
                  <span className="w-32">🌞</span>
                )}
              </span>
            </button>
            {isAuthenticated() && (
              <>
                <div className="ml-3 relative">
                  <div>
                    <button
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={() => setIsOpen((isOpen) => !isOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  <div
                    className={classnames(
                      " origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5",
                      !isOpen && "hidden"
                    )}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link href="">
                      <a
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Your Profile
                      </a>
                    </Link>
                    <Link href="">
                      <a
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </Link>
                    <Link href="">
                      <a
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/blogs">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">
              Blog
            </a>
          </Link>
          <Link href="">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Contact
            </a>
          </Link>
          <Link href="">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Sign In
            </a>
          </Link>
          <Link href="">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Sign Out
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
