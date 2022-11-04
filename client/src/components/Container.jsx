import { useQuery, useMutation } from "@apollo/client";
import { DELETE_BOOK } from "../mutations/addBookMutation";
import { GET_BOOKS } from "../queries/booksQuery";

function Container() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>Loading...</p>;

  const handleDelete = (id) => {
    deleteBook({
      variables: { id },
    });
  };

  return (
    <div className="w-full flex flex-wrap gap-3 justify-around p-2">
      {data?.books.map((book) => {
        return (
          <div
            key={book.id}
            className={`flex flex-col p-2 rounded-md cursor-pointer transition ease-out delay-75 hover:scale-125 justify-center items-center max-w-max bg-gradient-to-br ${
              book.id % 2 === 0
                ? "from-[#202221] to-[#283A34]"
                : "from-[#22211F] to-[#442E29]"
            }`}
            onClick={() => handleDelete(book.id)}
          >
            <p className="font-extralight">{book.name}</p>
            <span className="self-end font-thin text-xs italic">
              {book.author.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Container;
