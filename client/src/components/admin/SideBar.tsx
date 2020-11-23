import Link from "next/link";
import React from "react";

function SideBar() {
  return (
    <div>
      <ul>
        <li className="p-4 border-b-2 border-gray-100 font-medium  tracking-wider text-gray-500 uppercase bg-gray-50 ">
          <Link href="/admin/category/create">
            <a>Manage Category</a>
          </Link>
        </li>
        <li className="p-4 border-b-2 border-gray-100 font-medium  tracking-wider text-gray-500 uppercase bg-gray-50 ">
          <Link href="/admin/tag/create">
            <a>Manage Tag</a>
          </Link>
        </li>
        <li className="p-4 border-b-2 border-gray-100 font-medium  tracking-wider text-gray-500 uppercase bg-gray-50 ">
          <Link href="/admin/blog/create">
            <a>Manage Blog</a>
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default SideBar;
