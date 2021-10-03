//Notes: use findIndex to determine index number of book.
// Then add data-book number to row with the index number
// Theeeen add delete button

// remove book from library, which will remove row when new table is created
// Program remove function when button is clicked

// Create library array
let library = [];
let newBook = "";

// Create book object 
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function() {
      return (`${title} by ${author}, ${pages} pages, ${readStatus}`);
    }
  }

  const lolita = new Book('Lolita', 'Nabokov', 300, 'already read');
  const emma = new Book('Emma', 'Jane Austen', 200, 'already read' );
  const beloved = new Book('Beloved', 'Toni Morrison', 350, 'already read');

// Add book to library array
function addBookToLibrary(book) {
  library.push(book);
}

addBookToLibrary(lolita);
addBookToLibrary(emma);
addBookToLibrary(beloved);


function createTable() {
    let rest = document.getElementById("rest");
        
    while (rest.firstChild) {
        rest.removeChild(rest.firstChild);
    }


    library.forEach(function(book) {

        let index = library.findIndex(libraryBook => libraryBook === book);

        // Create new divs
        const row = document.createElement('div'); 
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const statusButton = document.createElement('BUTTON');
        const removeButton = document.createElement('BUTTON');
        removeButton.textContent = "Remove";
        removeButton.classList.add("removeButtons");
    
        row.classList.add('row');
        
        // Set data attribute for button
        removeButton.setAttribute('data-index', index);
        // Add event listner to button
        removeButton.addEventListener('click', removeBook);

        statusButton.setAttribute('data-index', index);
        statusButton.addEventListener('click', changeStatus);
    
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        statusButton.textContent = book.readStatus;
    
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(statusButton);
        row.appendChild(removeButton);
        rest.appendChild(row);
       
    });
}

createTable();


// Validating Empty Field
function submitForm(event) {
    event.preventDefault();

    if (document.getElementById('formtitle').value == "" || document.getElementById('formauthor').value == "" || document.getElementById('formpages').value == "") {
    alert("Please fill out every field.");
    } else {
    
        const check = document.getElementById('formstatus');
    if (check.checked == true) {
        checkStatus = 'already read';
    } else {
        checkStatus = "haven't read yet";
    }
    newBook = new Book(document.getElementById('formtitle').value, document.getElementById('formauthor').value, document.getElementById('formpages').value, checkStatus);
    }
    addBookToLibrary(newBook);
    console.log(library);
    console.log(newBook);
    hidePopup();
    createTable();

    const bookForm = document.getElementById("form");
    bookForm.reset();
}

//Function To Display Popup
function displayPopup() {
    document.getElementById('formpopup').style.display = "block";
}
//Function to Hide Popup
function hidePopup() {
    document.getElementById('formpopup').style.display = "none";
}

function removeBook(e) {

    let bookIndex = e.target.dataset.index;
    library.splice(bookIndex, 1);
    createTable();
}

function changeStatus(e) {
    let bookIndex = e.target.dataset.index;
    let chosenBook = library[bookIndex];

    if (chosenBook.readStatus == "already read") {
        chosenBook.readStatus = "haven't read yet";
    } else {
        chosenBook.readStatus = "already read";
    }
    createTable();
 }
