import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/booksQuery";

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <form className="w-3/4 mx-auto my-4 flex flex-col justify-center items-center rounded p-2 bg-gradient-to-br from-[#202221] to-[#283A34]">
      <h2 className="text-center">Add A Book</h2>
      <input
        type="text"
        className="w-full outline-none border-b placeholder:text-gray-100 placeholder:font-thin bg-transparent my-3"
        placeholder="Title..."
      />
      <input
        type="text"
        className="w-full outline-none border-b placeholder:text-gray-100 placeholder:font-thin bg-transparent my-3"
        placeholder="Genre..."
      />
      <select className="bg-transparent outline-none border-b self-start my-2">
        <option>Select The Author</option>
        {data?.authors.map((author) => (
          <option value={author.id}>{author.name}</option>
        ))}
      </select>
      <button
        type="button"
        className="bg-gradient-to-r from-[#22211F] to-[#442E29] my-3 cursor-pointer py-1 px-4 self-start rounded-xl"
      >
        Add To Books
      </button>
    </form>
  );
}

export default AddBook;
