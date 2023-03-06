let bookSearch = `http://openlibrary.org/search.json?q=`;
let bookFind = `http://openlibrary.org`;
let coversURL = `https://covers.openlibrary.org/b/id/`;

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

// to get the cover of the book call or reference https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg
// with -S, -M or -L for small, medium, large images with the isbn of the book
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

//This is a promise that returns an object containing data about a specific book based on the title given
let getBookAndAuthor = async (title, size) => {
    let bookData = {};
    let foundBook = await searchBooksByTitle(title);
    let bookSpecifics = await getBook(foundBook.docs[0].key);
    let i = 0;

    //The search is based on relavency to query not the popularity
    //so this checks for a cover so that we know it's probably the one we're looking for
    while(bookSpecifics.covers === undefined){
        bookSpecifics = await getBook(foundBook.docs[i++].key)
    }

    foundBook = foundBook.docs[i];
    bookData.title = foundBook.title;

    //changed the author and publisher logic so that it's better for a wide selection of books
    if(foundBook.author_name){
        bookData.author = foundBook.author_name;
    }else{
        bookData.publisher = foundBook.publisher;
    }

    if(bookData.author){
        bookData.author = bookData.author instanceof Array ? bookData.author.toString() : bookData.author;
    }else{
        bookData.publisher = bookData.publisher instanceof Array ? bookData.publisher.toString() : bookData.publisher;
    }
    
    //if there is a description we try to parse the first bit of description so the whole book isn't given away
    //sometimes the description will be an object with a type and value elements
    if(bookSpecifics.description instanceof Object){
        bookData.description = bookSpecifics.description.value.includes(`\r\n`) ? bookSpecifics.description.value.split(`\r\n`)[0] : bookSpecifics.description.value;
    }else if(bookSpecifics.description){
        bookData.description = bookSpecifics.description.includes(`\r\n`) ? bookSpecifics.description.split(`\r\n`)[0] : bookSpecifics.description;
    }

    //gets the cover and stores it in the proper url format
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