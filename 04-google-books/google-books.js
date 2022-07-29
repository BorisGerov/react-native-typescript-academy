const getBookElement = function (book) {
  const bookElem = document.createElement("article");
  if (book.volumeInfo.subtitle === undefined) {
    book.volumeInfo.subtitle = " ";
  }
  bookElem.innerHTML = `
      <figure class="leftSec">
        <img class="image" src="${
          book.volumeInfo.imageLinks.thumbnail
        }" width="352px" height="182px">
        <figcaption>${book.volumeInfo.authors}</figcaption>
      </figure>
      <div class="text">
        <h1>${book.volumeInfo.title}</h1>
        <h2>${book.volumeInfo.subtitle}</h2>
        <p>${(book.volumeInfo.description === undefined) ? "No description" : book.volumeInfo.description.slice(0, 500)}</p>
        <address>${book.volumeInfo.publishedDate}</address>
      </div>
    
      `;
  return bookElem;
};

function submitEvent(event) {
  event.preventDefault();
  console.log(event);
  const input = document.querySelector("input");
  console.log(input.value);
  const search = encodeURIComponent(input.value);
  input.value = "";
  init(search);
}

const form = document.querySelector(".navContainer");
form.addEventListener("submit", submitEvent);

async function init(input = "java") {
  // try {
    const search = input;
    const resultsElem = document.getElementById("main");
    const booksResp = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}`
    );
    const books = await booksResp.json();
    console.log(books);
    resultsElem.innerHTML="";
    books.items.forEach((book) => {
      resultsElem.appendChild(getBookElement(book));
    });
  // } catch (err) {
  //   console.log("Error", err);
  // } finally {
  //   console.log("Demo finished");
  // }
}
init();
