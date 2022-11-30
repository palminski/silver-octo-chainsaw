import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';


import {GET_ME} from '../utils/queries';
import {DELETE_BOOK} from '../utils/mutations';
import {useMutation, useQuery} from '@apollo/client';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  const [deleteBook] = useMutation(DELETE_BOOK, {
    update(cache, {data: {deleteBook}}){

      try {
        const { getSingleUser } = cache.readQuery({query: GET_ME});
      console.log(getSingleUser);
      
      cache.writeQuery({
        query: GET_ME,
        data: {getSingleUser: {...getSingleUser, savedBooks: deleteBook.savedBooks}},
      });
      } catch (error) {
        console.log(error);
      }
  }
  });
  //<><><><><><><><><
  
  const {loading,data} = useQuery(GET_ME);
  console.log(data);
  const userData = data?.getSingleUser || {};
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  //<><><><><><><><><

  

  // // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const {data} = await deleteBook({
        variables: {bookId: bookId}
      });
      console.log(data);
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so

  

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}> {/* on click will delete book from favorites */}
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
