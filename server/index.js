const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const { json, type } = require('express/lib/response');
const res = require('express/lib/response');

const app = express();



// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

//giving static array
let books = [ {
    "isbn": "BOOK001",
    "title": "Wings of Fire",
    "author": "APJ Abdulkalam",
    "price": "370"
},
{
    "isbn": "BOOK002",
    "title": "Harry Potter",
    "author": "J.K. Rowlings",
    "price": "500"
},
{
    "isbn": "BOOK003",
    "title": "Harry Potter ka beta",
    "author": "J.K. Rowlings",
    "price": "500"
},
{
    "isbn": "BOOK004",
    "title": "Harry Potter ki bahu",
    "author": "J.K. Rowlings",
    "price": "500"
}
];

//assigning PORT from environment file
const PORT = process.env.PORT || 5000;


//base url response
app.get('/', (req, res) =>{
    res.send("Hello World");
} )


// add/create new book
app.post('/book', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.send({
        "status" : "success",
        "message" : "Book added successfully",
        "data" : newBook

    });
});


//get all books
app.get('/book', (req, res) => {
    res.send({
        status : 'success',
        data : books
    })
})

//update book by isbn
// app.put('./book/:isbn', (req, res) =>{


//     const isbn = req.params.isbn;


//     let newBook = {
//         isbn : isbn,
//         title : req.body.title,
//         author : req.body.author,
//         price : req.body.price
//     }

//     let isUpdated = false

//     for (let i = 0; i<= books.length; i++ ){
//         if(books[i].isbn===isbn)
//         {
//             books[i]= newBook;
//             isUpdated = true;
//             break;
//         }
//     }

//     res.send({
//         status : isUpdated ? "success": "Failure/ Error occurred",
//         message : isUpdated ? "Book updated successfully" : "Book not found"
//     })

// });

//delete book by isbn
app.post('/book/:isbn', (req, res) =>{
    const isbn = req.params.isbn;

    let newBooks = books.filter(isMatches);

    books = newBooks;

    function isMatches(book){
        return book.isbn !== isbn;
    }
    
    
    res.send({
        status: "success",
        message : "book deleted successfully",
        book : books
    })
});

//get book by ISBN
app.get('/book/:isbn', (req, res) =>{
    const isbn = req.params.isbn;
    let newBook;
    let isFound = false;
    
    console.log(`ISBN : ${isbn}`);

    for( let i=0; i<books.length; i++)
    {
        if(books[i].isbn===isbn)
        {
            newBook = books[i];
            isFound = true;
            break;
        }
    }
    
    res.send({
        status: isFound ? 'success' : 'Failure',
        message : isFound ? 'Book found' : 'Book not found',
        book : newBook
    })
});


// making app listen
app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${PORT}`);
})