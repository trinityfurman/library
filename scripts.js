// Create library array
let library = [];
let newBook = "";

// Create book object 
  class Book {
      constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
      }
  }

// Add book to library array
function addBookToLibrary(book) {
  library.push(book);
}

// Create table 
function createTable() {
    let rest = document.getElementById("rest");
       
    // Remove previous rows to reset
    while (rest.firstChild) {
        rest.removeChild(rest.firstChild);
    }

    // Cycle through each book in array and create a row
    library.forEach(function(book) {

        // Find array index for specific book
        let index = library.findIndex(libraryBook => libraryBook === book);

        // Create new divs and buttons for the row
        const row = document.createElement('div'); 
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const statusDiv = document.createElement('div');
        const statusButton = document.createElement('BUTTON');
        const removeDiv = document.createElement('div');
        const removeButton = document.createElement('BUTTON');
        
        // Add specific classes to divs and buttons 
        removeButton.textContent = "x";
        removeButton.classList.add("removeButtons");
        removeDiv.classList.add("removeDivs");
        statusDiv.classList.add("statusDivs");
        row.classList.add('row');
        pages.classList.add('pages');
        
        // Set data attribute for buttons based on the array index
        removeButton.setAttribute('data-index', index);
        statusButton.setAttribute('data-index', index);
        
        // Add event listener to buttons with appropriate function
        removeButton.addEventListener('click', removeBook);
        statusButton.addEventListener('click', changeStatus);
    
        // Populate divs with the info of each book
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        statusButton.textContent = book.readStatus;
    
        // Append divs and buttons to the table
        removeDiv.appendChild(removeButton);
        statusDiv.appendChild(statusButton);
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(statusDiv);
        row.appendChild(removeDiv);
        rest.appendChild(row);
       
    });
}

function submitForm(event) {
    // Prevent page from refreshing
    event.preventDefault();

    // Prevent empty form from being submitted
    if (document.getElementById('formtitle').value == "" || document.getElementById('formauthor').value == "" || document.getElementById('formpages').value == "") {
        alert("Please fill out every field.");
    } else {
        const check = document.getElementById('formstatus');
        if (check.checked == true) {
            checkStatus = 'already read';
        } else {
            checkStatus = "unread";
        }
        // Create new book object based on info from form
        newBook = new Book(document.getElementById('formtitle').value, document.getElementById('formauthor').value, document.getElementById('formpages').value, checkStatus);
    
    // Add new book to library array and create table
    addBookToLibrary(newBook);
    hidePopup();
    createTable();
    saveLibrary(library);

    // Reset form
    const bookForm = document.getElementById("form");
    bookForm.reset();
    }
}

// Display popup
function displayPopup() {
    document.getElementById('formpopup').style.display = "block";
    document.getElementById('modal').style.display = "block";
}
// Hide popup
function hidePopup() {
    document.getElementById('formpopup').style.display = "none";
    document.getElementById('modal').style.display = "none";
}

// Remove book from array based on index
function removeBook(e) {
    let bookIndex = e.target.dataset.index;
    library.splice(bookIndex, 1);
    createTable();
    saveLibrary(library);
}

// Change read status of book at specific index
function changeStatus(e) {
    let bookIndex = e.target.dataset.index;
    let chosenBook = library[bookIndex];

    if (chosenBook.readStatus == "already read") {
        chosenBook.readStatus = "unread";
    } else {
        chosenBook.readStatus = "already read";
    }
    createTable();
    saveLibrary(library);
 }

 // Save library array in local storage
function saveLibrary(newArray) {
    localStorage.setItem('bookArray', JSON.stringify(newArray));
 }

 // Grab array from local storage
function grabArray() {
     if (localStorage.getItem('bookArray') == null ) {
        return 'undefined';
     } else {
         return JSON.parse(localStorage.getItem('bookArray'));
     }
 }

// Ensure local storage is used only when it's not empty
 if (grabArray() != 'undefined') {
     library = grabArray();
 }  

 // Create initial table
 createTable();
