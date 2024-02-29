import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    const url = `https://book-mern-project.cyclic.app/books/${id}`;

    axios
      .delete(url)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check console");
        console.log(error);
        enqueueSnackbar("Error", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>

      <div className="flex-col flex items-center border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full hover:bg-red-700 transition duration-300 ease-in-out"
          onClick={handleDeleteBook}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
