import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    books {
      id
      name
      author {
        name
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query {
    authors {
      name
      id
    }
  }
`;

export { GET_BOOKS, GET_AUTHORS };
