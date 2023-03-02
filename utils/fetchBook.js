let bookSearch = `http://openlibrary.org/search.json?q=`;
let bookFind = `http://openlibrary.org`;
let coversURL = `https://covers.openlibrary.org/b/id/`;

// book description first make api call with search query q={book_title}
// get the key from that json response of any of the objects in the docs array
// fetch request with http://openlibrary.org/works/{...}.json or http://openlibrary.org{key}.json with key being from the last request
// this will return a json object with a title, authors array a description
//      Here is a sample object of http://openlibrary.org/works/OL45804W.json or "Fantastic Mr Fox"

    // {
    //     "title": "Fantastic Mr Fox",
    //     "key": "/works/OL45804W",
    //     "authors": [
    //         {
    //             "author": {
    //                 "key": "/authors/OL34184A"
    //             },
    //             "type": {
    //                 "key": "/type/author_role"
    //             }
    //         }
    //     ],
    //     "description": "The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.\r\n\r\nFinally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer's houses.\r\n\r\nAided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.",
    //     "subjects": [
    //         "Animals",
    //         "Hunger",
    //         "Open Library Staff Picks",
    //         "Juvenile fiction",
    //         "Children's stories, English",
    //         "Foxes",
    //         "Fiction",
    //         "Zorros",
    //         "Ficción juvenil",
    //         "Tunnels",
    //         "Interviews",
    //         "Farmers",
    //         "Children's stories",
    //         "Rats",
    //         "Welsh Authors",
    //         "English Authors",
    //         "Thieves",
    //         "Tricksters",
    //         "Badgers",
    //         "Children's fiction",
    //         "Foxes, fiction",
    //         "Underground",
    //         "Renards",
    //         "Romans, nouvelles, etc. pour la jeunesse",
    //         "Children's literature",
    //         "Plays",
    //         "Children's plays",
    //         "Children's stories, Welsh",
    //         "Agriculteurs",
    //         "Large type books",
    //         "Fantasy fiction"
    //     ],
    //     "subject_people": [
    //         "Bean",
    //         "Boggis",
    //         "Bunce",
    //         "Mr Fox"
    //     ],
    //     "created": {
    //         "type": "/type/datetime",
    //         "value": "2009-10-15T11:34:21.437031"
    //     },
    //     ...
    // }

//      Based on the description we can pull the first blurb as a synopsis up by looking for the string \r\n\r\n so that we don't spoil the whole book

// we can also pull up author data with http://openlibrary.org/authors/{authorkey}.json such as the name or photos

// to get the cover of the book call or reference https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg
// with -S, -M or -L for small, medium, large images with the isbn of the book



let searchBooksByTitle = async (title) => {
    return await fetch(bookSearch + `` + title).then(res => {return res.json()})
    .then(data => {
        return data;
    }).catch(err => {throw err;});
};

let getBook = async (bookPath) => {
    return await fetch(bookFind + `` + bookPath + `.json`).then(res => {return res.json();})
    .then(data => {
        return data;
    }).catch(err => {throw err;});
};

let getCoverURL = (id, size) => {
    switch(size){
        case 'small':
        case 'Small':
        case 's':
        case 'S':
            return coversURL + `` + id + `-S.jpg`;
        case 'medium':
        case 'Medium':
        case 'm':
        case 'M':
            return coversURL + `` + id + `-M.jpg`;
        case 'large':
        case 'Large':
        case 'l':
        case 'L':
            return coversURL + `` + id + `-L.jpg`;
    }
    
};

//This is a promis that returns an object containing data about a specific book based on the title given
let getBookAndAuthor = async (title, size) => {
    let bookData = {};
    let foundBook = await searchBooksByTitle(title);
    foundBook = foundBook.docs[0];
    let bookSpecifics = await getBook(foundBook.key);
    bookData.title = foundBook.title;
    bookData.author = foundBook.author_name ? foundBook.author_name : foundBook.publisher;
    bookData.author = bookData.author instanceof Array ? foundBook.author_name.toString() : foundBook.author_name;
    bookData.description = bookSpecifics.description.split(`\r\n`)[0];
    //default to medium for now
    bookData.cover = getCoverURL(bookSpecifics.covers[0], size);

    return bookData;
}

//This gets length number of books searched with just the title and author
let getBookListBySearch = async (title, length) => {
    let bookList = [];
    let currentBookList = await searchBooksByTitle(title);
    for(let i = 0; i < length; i++){
        let currentBookData = {};
        let currentBook = currentBookList.docs[i];
        currentBookData.title = currentBook.title;
        currentBookData.author = currentBook.author_name ? currentBook.author_name : currentBook.publisher;
        currentBookData.author = currentBookData.author instanceof Array ? currentBookData.author.toString() : currentBook.author;
        bookList.push(currentBookData);
    }
    return bookList;
}

module.exports = { getBookAndAuthor,  getBookListBySearch };