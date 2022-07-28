const getBookElement = function (book) {
  const bookElem = document.createElement("article");
  if(book.volumeInfo.subtitle === undefined){
    book.volumeInfo.subtitle = " ";
  }
  bookElem.innerHTML = `
      <figure class="leftSec">
        <img class="image" src="${book.volumeInfo.imageLinks.thumbnail}" width="352px" height="182px">
        <figcaption>${book.volumeInfo.authors}</figcaption>
      </figure>
      <h1>${book.volumeInfo.title}</h1>
      <h2>${book.volumeInfo.subtitle}</h2>
      <div class="text">
        <p>${book.volumeInfo.description.slice(0,500)}</p>
        <address>${book.volumeInfo.publishedDate}</address>
      </div>
    
      `;
  return bookElem;
};

async function init() {
  try {
    const search = "java";
    const resultsElem = document.getElementById("main");
    const booksResp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
    const books = await booksResp.json();
    console.log(books);
    books.items.forEach((book) => {
      resultsElem.appendChild(getBookElement(book));
    });
  } catch (err) {
    console.log("Error", err);
  } finally {
    console.log("Demo finished");
  }
}
init();
