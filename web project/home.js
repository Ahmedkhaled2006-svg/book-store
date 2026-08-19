
function updateNavbar() {
    
    var currentuser = JSON.parse(localStorage.getItem("currentuser"));

    
    var guestLinks = document.getElementById("guestLinks");
    var userLinks = document.getElementById("userLinks");

    
    if (currentuser) {
   
        if (guestLinks) guestLinks.style.display = "none";
        if (userLinks) userLinks.style.display = "flex";
    } else {
        
        if (guestLinks) guestLinks.style.display = "flex";
        if (userLinks) userLinks.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", updateNavbar);
// 1. جلب الكتب من الـ LocalStorage أو الاعتماد على initialBOOKS
var BOOKS = JSON.parse(localStorage.getItem("books"));

if (!BOOKS || BOOKS.length === 0) {
    if (typeof initialBOOKS !== 'undefined') {
        BOOKS = [...initialBOOKS];
        localStorage.setItem("books", JSON.stringify(BOOKS)); 
    } else {
        BOOKS = [];
    }
}


function displayHomeBooks(booksToRender) {
    const grid = document.getElementById("booksGrid");
    if (!grid) return;

    grid.innerHTML = "";

    if (booksToRender.length === 0) {
        grid.innerHTML = `<p class="no-results">No books found matching your search.</p>`;
        return;
    }

   booksToRender.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <div class="book-info">
                <span class="category-tag">${book.category}</span>
                <h3>${book.title}</h3>
                <p class="author">By ${book.author}</p>
                <p class="price">EGP ${book.price}</p>
                
                <div class="card-actions" style="display: flex; gap: 10px; margin-top: 10px;">
                    <a href="book-details.html?id=${book.id}" class="details-btn">View Details</a>
                    <button onclick="addToCartDirect('${book.id}')" class="add-btn">Add to Cart</button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    displayHomeBooks(BOOKS);
});
function addToCartDirect(bookId) {
    const book = BOOKS.find(b => b.id === bookId);
    if (!book) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingBook = cart.find(item => item.id === book.id);

    if (existingBook) {
        existingBook.quantity = (existingBook.quantity || 1) + 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${book.title} added to cart!`);
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    
    const filteredBooks = BOOKS.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );

    displayHomeBooks(filteredBooks);
});


document.addEventListener("DOMContentLoaded", () => {
    displayHomeBooks(BOOKS);
});
function handleSearch() {
    
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    
    const filteredBooks = BOOKS.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(searchTerm);
        const authorMatch = book.author && book.author.toLowerCase().includes(searchTerm);
        return titleMatch || authorMatch;
    });

    displayBooks(filteredBooks); 
  
}