import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK } from "../mutations/addBookMutation";

import { GET_AUTHORS } from "../queries/booksQuery";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook, { error: addError }] = useMutation(ADD_BOOK, {
    update(cache, { data: { addBook } }) {
      cache.modify({
        fields: {
          books(existingBooks = []) {
            const newBookRef = cache.writeFragment({
              data: addBook,
              fragment: gql`
                fragment NewBook on Book {
                  name
                  genre
                  id
                }
              `,
            });
            return [...existingBooks, newBookRef];
          },
        },
      });
    },
  });

  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
    });
    if (addError) {
      console.log(addError);
    }
    setName("");
    setAuthorId("");
    setGenre("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 mx-auto my-4 flex flex-col justify-center items-center rounded p-2 bg-gradient-to-br from-[#202221] to-[#283A34]"
    >
      <h2 className="text-center">Add A Book</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full outline-none border-b placeholder:text-gray-100 placeholder:font-thin bg-transparent my-3"
        placeholder="Title..."
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full outline-none border-b placeholder:text-gray-100 placeholder:font-thin bg-transparent my-3"
        placeholder="Genre..."
      />
      <select
        onChange={(e) => setAuthorId(e.target.value)}
        className="bg-transparent outline-none border-b self-start my-2"
      >
        <option>Select The Author</option>
        {data?.authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-gradient-to-r from-[#22211F] to-[#442E29] my-3 cursor-pointer py-1 px-4 self-start rounded-xl"
      >
        Add To Books
      </button>
    </form>
  );
}

export default AddBook;
