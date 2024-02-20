import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-1 rounded-lg w-fit transition duration-300 ease-in-out"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
