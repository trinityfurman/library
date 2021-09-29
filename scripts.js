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
    library.forEach(function(book) {

        const table = document.querySelector('.table');
        
        // Create new divs
        const row = document.createElement('div'); 
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const status = document.createElement('div');
    
        row.classList.add('row');
    
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        status.textContent = book.readStatus;
    
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(status);
        table.appendChild(row);
    });
}

createTable();


// Validating Empty Field
function submitForm(event) {
    event.preventDefault();
    
    if (document.getElementById('formtitle').value == "" || document.getElementById('formauthor').value == "" || document.getElementById('formpages').value == "") {
    alert("Please fill out every field.");
    } else {
    const check = document.getElementById('status');
    if (status.checked == true) {
        checkStatus = 'already read';
    } else {
        checkStatus = "haven't read yet";
    }
    newBook = new Book(document.getElementById('formtitle').value, document.getElementById('formauthor').value, document.getElementById('formpages').value, checkStatus);
    }
    addBookToLibrary(newBook);
    console.log(library);
    console.log(newBook);
    createTable();
}

//Function To Display Popup
function displayPopup() {
    document.getElementById('formpopup').style.display = "block";
}
//Function to Hide Popup
function hidePopup(){
    document.getElementById('formpopup').style.display = "none";
}