
var BOOKS = JSON.parse(localStorage.getItem("books"));
if (!BOOKS || BOOKS.length === 0) {
    if (typeof initialBOOKS !== 'undefined') {
        BOOKS = [...initialBOOKS];
        localStorage.setItem("books", JSON.stringify(BOOKS)); 
    } else {
        BOOKS = [];
    }
}


const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");
const book = BOOKS.find(b => b.id === bookId);

console.log("Book ID:", bookId);
console.log("Found Book:", book);


if (book) {
    const bookImage = document.getElementById("bookImage");
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");
    const bookCategory = document.getElementById("bookCategory");
    const bookDescription = document.getElementById("bookDescription");
    const bookPrice = document.getElementById("bookPrice");

    if (bookImage) { bookImage.src = book.image; bookImage.alt = book.title; }
    if (bookTitle) { bookTitle.textContent = book.title; }
    if (bookAuthor) { bookAuthor.textContent = `By ${book.author}`; }
    if (bookCategory) { bookCategory.textContent = book.category; }
    if (bookDescription) { bookDescription.textContent = book.description; }
    if (bookPrice) { bookPrice.textContent = `EGP ${book.price}`; }
}


function addToCart(targetBookId) {
    var currentuser = JSON.parse(localStorage.getItem("currentuser"));

    if (!currentuser) {
        alert("You must have an account to add items to your cart!");
        window.location.href = "register.html";
        return;
    }

    
    var selectedBook = BOOKS.find(item => item.id === targetBookId);

    if (!selectedBook) {
        alert("Book not found!");
        return;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var existingBook = cart.find(item => item.id === targetBookId);

    if (existingBook) {
        existingBook.quantity = (existingBook.quantity || 1) + 1;
    } else {
        cart.push({
            id: selectedBook.id,
            title: selectedBook.title,
            price: selectedBook.price,
            image: selectedBook.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(selectedBook.title + " has been added to your cart!");
}


function gotocart() {
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));

    if (!currentuser) {
        alert("You must have an account to view your cart!");
        window.location.href = "register.html";
        return;
    }
    window.location.href = "cart.html";
}