const booksContainer = document.getElementById("books-container");
const categoryButtons = document.querySelectorAll(".category-btn");

var BOOKS = JSON.parse(localStorage.getItem("books"));

if (!BOOKS || BOOKS.length === 0) {
    if (typeof initialBOOKS !== 'undefined') {
        BOOKS = [...initialBOOKS];
        localStorage.setItem("books", JSON.stringify(BOOKS)); 
    } else {
        BOOKS = [];
    }
}


function displayBooks(books) {

    const container = document.getElementById("books-container"); 
    if (!container) return;

    container.innerHTML = "";
    
    books.forEach(book => {
        const bookCard = document.createElement("article");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p class="author"><span class="by">By</span> ${book.author}</p>
            <span class="category">${book.category}</span>
            <span class="price">EGP ${book.price}</span>
            <a href="book-details.html?id=${book.id}">View Details</a>
           <button onclick="addToCart('${book.id}')" class="add-btn">Add to Cart</button>
        `;

        container.appendChild(bookCard);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    displayBooks(BOOKS);
});

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
       
        categoryButtons.forEach(btn => { 
            btn.classList.remove("active"); 
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.category;
        if (selectedCategory === "all") {
            displayBooks(BOOKS);
        } else {
            const filteredBooks = BOOKS.filter(book => 
                book.category.toLowerCase().replace(", ", "-") === selectedCategory
            );
            displayBooks(filteredBooks);
        }
    });
});

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