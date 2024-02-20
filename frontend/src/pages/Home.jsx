import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BooksTable, BooksCard } from "../components/Home";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { Spinner } from "../components";
import { PiBookOpenTextLight } from "react-icons/pi";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState(
    localStorage.getItem("showType") || "tables"
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handleShowTypeChange = (type) => {
    setShowType(type);
    localStorage.setItem("showType", type);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4 mb-8">
        <button
          className={`${
            showType === "tables"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 hover:bg-gray-600"
          } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
          onClick={() => handleShowTypeChange("tables")}
        >
          Table
        </button>
        <button
          className={`${
            showType === "card"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 hover:bg-gray-600"
          } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
          onClick={() => handleShowTypeChange("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl flex items-center gap-x-2">
          <PiBookOpenTextLight className="text-blue-500 text-4xl" />
          Books List
        </h1>

        <Link
          to="/books/create"
          className="text-blue-800 text-4xl hover:text-blue-600 transition duration-300 ease-in-out rounded-lg"
        >
          <MdOutlineAddBox />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "tables" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
