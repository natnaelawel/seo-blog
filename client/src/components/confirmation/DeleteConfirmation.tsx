import React, { useEffect, useState } from "react";
import classnames from "classnames";
function DeleteConfirmation({ message, handleDelete, handleCancel }) {
  const [deleteData, setDeleteData] = useState(false);
  useEffect(() => {
    if (deleteData) {
      handleDelete();
      handleCancel();
    }
  }, [deleteData]);
  return (
    <div
      className={classnames(
        "bg-white mt-10 p-10 mx-auto rounded-2xl shadow-2xl text-center flex flex-col justify-between items-center space-y-5",
        deleteData ? "animate-slideUp" : "animate-slideDown"
      )}
      style={{ maxWidth: "400px", maxHeight: "500px" }}
    >
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-red-400 mb-5">Confirm Delete</h1>
        <hr />
        <p className="text-xl text-yellow-500">{message}</p>
      </div>
      <div className="my-5 space-y-5">
        <button
          className="px-6 py-3 rounded-lg mx-4 bg-red-500 text-white"
          onClick={() => setDeleteData(true)}
        >
          Confirm
        </button>
        <button
          className="px-6 py-3 rounded-lg mx-4 bg-gray-400 text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
