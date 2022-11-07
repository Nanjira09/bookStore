import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { fireEvent, render, screen } from "@testing-library/react";
import Container from "./Container";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const MockContainer = () => {
  return (
    <ApolloProvider client={client}>
      <Container />
    </ApolloProvider>
  );
};

describe("Container", () => {
  beforeEach(() => {
    render(<MockContainer />);
  });

  it("Should have 5 items", async () => {
    const bookTitles = await screen.findAllByTestId("book-title");
    expect(bookTitles.length).toBe(5);
  });

  it("The first item", async () => {
    const firstBook = await screen.findByTestId("book-container-0");
    expect(firstBook.textContent).toContain("Name of the Wind");
  });
});
