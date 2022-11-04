import { gql } from "@apollo/client";

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      id
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID) {
    deleteBook(id: $id) {
      name
      id
    }
  }
`;

export { ADD_BOOK, DELETE_BOOK };
