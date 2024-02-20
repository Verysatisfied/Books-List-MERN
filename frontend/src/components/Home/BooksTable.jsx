import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="py-3 px-4 text-left">No</th>
          <th className="py-3 px-4 text-left">Title</th>
          <th className="py-3 px-4 text-left hidden md:table-cell">Author</th>
          <th className="py-3 px-4 text-left hidden md:table-cell">
            Publish Year
          </th>
          <th className="py-3 px-4 text-left hidden md:table-cell">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr
            key={book._id}
            className="border-b border-gray-300 hover:bg-gray-100"
          >
            <td className="py-3 px-4 text-center">{index + 1}</td>
            <td className="py-3 px-4">
              <Link
                to={`/books/details/${book._id}`}
                className="text-blue-700 hover:underline"
              >
                {book.title}
              </Link>
            </td>
            <td className="py-3 px-4 hidden md:table-cell">{book.author}</td>
            <td className="py-3 px-4 hidden md:table-cell">
              {book.publishYear}
            </td>
            <td className="py-3 px-4 hidden md:table-cell">
              <div className="flex items-center">
                <Link
                  to={`/books/details/${book._id}`}
                  className="text-green-700 hover:text-green-900 mr-2"
                >
                  <BsInfoCircle className="text-xl" />
                </Link>
                <Link
                  to={`/books/edit/${book._id}`}
                  className="text-yellow-700 hover:text-yellow-900 mr-2"
                >
                  <AiOutlineEdit className="text-xl" />
                </Link>
                <Link
                  to={`/books/delete/${book._id}`}
                  className="text-red-700 hover:text-red-900"
                >
                  <MdOutlineDelete className="text-xl" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
