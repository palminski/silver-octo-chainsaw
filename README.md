# Portfolio Site for William Bolls 
![wireframe](/image-for-readme.PNG)
[View live site here](https://book-saver-palmtree.herokuapp.com/)

## Description
This application was converted by myself to use graphql as opposed to RESTful API requests. It is a simple app that will search for books using a google books api. Books can be saved to a users account to be referenced later. All API requests for saving, deleting, and loging/signing in use graphql.

## Notes
I began this project be referencing the RESTful API routes and what each API call was supposed to do. Next, I created type defs and resolvers one by one and tested them using the graphql website to make sure that they worked. After confirming they were functional I added each one to the front end, replacing the old API calls, so that calls can be initiated client side. Once application was functional with the new set up I removed the old APIs (except the google books one as it wasnt dealing with the DB)

The most dificult part was getting the saved books to update on the saved books page without hard refreshing, but by updating the cache when delete or add mutations were performed.

## Questions?
contact me!
my Github page can be viewed [here](https://github.com/palminski)