import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { fireEvent, render, screen } from "@testing-library/react";
import AddBook from "./AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const MockAddBook = () => {
  return (
    <ApolloProvider client={client}>
      <AddBook />
    </ApolloProvider>
  );
};

describe("AddBook", () => {
  beforeEach(() => {
    render(<MockAddBook />);
  });
  it("Title exists", async () => {
    const heading = await screen.findByRole("heading");
    expect(heading.textContent).toBe("Add A Book");
  });

  it("Title should be empty", async () => {
    const titleInput = await screen.findByPlaceholderText("Title...");
    expect(titleInput.value).toBe("");
  });

  it("Title should change", async () => {
    const titleInput = await screen.findByPlaceholderText("Title...");
    fireEvent.change(titleInput, { target: { value: "Kite Runner" } });
    expect(titleInput.value).toBe("Kite Runner");
  });

  it("Genre should be empty", async () => {
    const genreInput = await screen.findByPlaceholderText("Genre...");
    expect(genreInput.value).toBe("");
  });

  it("Genre should change", async () => {
    const genreInput = await screen.findByPlaceholderText("Genre...");
    fireEvent.change(genreInput, { target: { value: "Fiction" } });
    expect(genreInput.value).toBe("Fiction");
  });

  it("Author should change", async () => {
    const selectElement = await screen.findByTestId("select-test");
    fireEvent.change(selectElement, {
      target: { value: "6360f40a86500ea4602793b0" },
    });
    expect(selectElement.value).toBe("6360f40a86500ea4602793b0");
  });

  it("AddBtn should be disabled if no title or genre", async () => {
    const addButton = await screen.findByRole("button");
    expect(addButton).toBeDisabled();
  });

  it("AddBtn adds book and title and genre becomes empty", async () => {
    const addButton = await screen.findByRole("button");
    const titleInput = await screen.findByPlaceholderText("Title...");
    const genreInput = await screen.findByPlaceholderText("Genre...");
    const selectElement = await screen.findByTestId("select-test");
    fireEvent.change(titleInput, { target: { value: "Kite Runner" } });
    fireEvent.change(genreInput, { target: { value: "Fiction" } });
    fireEvent.change(selectElement, {
      target: { value: "6360f40a86500ea4602793b0" },
    });

    fireEvent.click(addButton);
    expect(titleInput.value).toBe("");
  });
});
