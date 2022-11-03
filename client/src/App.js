import AddBook from "./components/AddBook";
import Container from "./components/Container";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-[#1B1C20] via-[#967DC0] to-[#3A7A66] p-4">
      <h1 className="text-lg font-semibold text-center">
        Just Learning React & GraphQL.
      </h1>
      <main className="w-1/2 m-auto rounded-md bg-[#161616] text-gray-200 p-3">
        <Container />
        <hr className="bg-[#442E29] border-none h-[1px] my-2" />
        <AddBook />
      </main>
    </div>
  );
}

export default App;
