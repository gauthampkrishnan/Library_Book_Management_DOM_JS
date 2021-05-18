 //ES5
 // book constructor
 function Book(title,author,ISBN){
     this.title = title;
     this.author = author;
     this.ISBN = ISBN;
 }
 //Ui constructor
function UI(){}
UI.prototype.addBook = function(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.ISBN}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);

}
UI.prototype.clearfields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}
UI.prototype.showalert = function(message,className){
    // Create div
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;
    // Add text 
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div,form);
    // Timeout after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();

    },3000);
}
//Delete book
UI.prototype.deletebook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();

    }
}

//EVENT LISTENERS for add data
document.getElementById('book-form').addEventListener('submit',function(e){
    //get form values
    const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;
   const isbn = document.getElementById('isbn').value;
   console.log(title,author,isbn)
   //instantiate book
   const book = new Book(title,author,isbn);
   //Instantiate ui
   const ui = new UI();
    //Validation
    if(title==='' || author===''|| isbn ===''){
        // Error alert 
        ui.showalert('Please fill the input','error');
    }
    else{
         //Add book to the list!
         
   ui.addBook(book);
   //Add data
   ui.showalert('Book Added !!!','sucess');
   //Clear fields
      ui.clearfields();
    }

   e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deletebook(e.target);
    //show message
    ui.showalert('Book Removed','sucess')
    e.preventDefault();
})