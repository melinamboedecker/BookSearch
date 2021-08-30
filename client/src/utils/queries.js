import { gql } from '@apollo/client';

// export const GET_ME = gql`
//         query me($userId: ID!) {
//             user(userId: $userId) {
//             _id
//             username
//             email
//             bookCount
//             savedBooks {
//                 boodId
//                 authors
//                 description
//                 image
//                 link
//                 title
//             }
//         }
//     }
// `;

export const GET_ME = gql`
{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;