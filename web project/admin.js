function loginuser() {

    document.getElementById("loginuser").classList.add("active");
    document.getElementById("loginadmin").classList.remove("active");

    document.getElementById("user").classList.add("active");
    document.getElementById("admin").classList.remove("active");
}

function loginadmin() {
   
    document.getElementById("loginadmin").classList.add("active");
    document.getElementById("loginuser").classList.remove("active");

    document.getElementById("admin").classList.add("active");
    document.getElementById("user").classList.remove("active");
}
function validweb()
     {
       var valid = true
       var Email=document.getElementById("loginEmail").value;
       var Pass=document.getElementById("loginPassword").value;
       var users=JSON.parse(localStorage.getItem("users"))||[];
      var founduser = users.find(function(user) {
        return user.email == Email && user.pass == Pass;
      });
      if(founduser)
       {
        alert("login successful! welcome back "+founduser.fName);
        localStorage.setItem("currentuser",JSON.stringify(founduser));
        window.location.href="home.html";
        return false;

      }
     else
     {
        alert(" user not found OR invalid email or password ");
        return false;
      }

     }
 
function validateAdminForm() {
    var email = document.getElementById("adminEmail").value;
    var password = document.getElementById("adminPassword").value;

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return false;
    }
    else if (email !== "admin@a.com") {
        alert("Invalid admin email.");
        return false;
    }
    else if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    else if (password !== "Ahmed2006@") {
        alert("Invalid admin password.");
        return false;
    }
    else
    {
        var adminacount={email,password };
        localStorage.setItem("currentuser",JSON.stringify(adminacount))

      window.location.href = "dashboard.html";
       return false;
    }
}

var newBook;

var currentIndex = -1;

var BOOKS = JSON.parse(localStorage.getItem("books"));

if (!BOOKS || BOOKS.length === 0) {
    if (typeof initialBOOKS !== 'undefined') {
        BOOKS = [...initialBOOKS]; 
    } else {
        BOOKS = []; 
    }
    localStorage.setItem("books", JSON.stringify(BOOKS));
}


function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(BOOKS));
}

function addBook() {
    var title = document.getElementById("bookTitle").value;
    var author = document.getElementById("bookAuthor").value;
    var price = document.getElementById("bookPrice").value;
    var category = document.getElementById("bookCategory").value;
    var image = document.getElementById("bookImage").value;
    var description = document.getElementById("bookDescription").value;

    if (title === "" || author === "" || price === "" || category === "" || image === "" || description === "") {
        alert("Please fill in all fields.");
        return false;
    }

    newBook = { id: "b_" + Date.now(), title, author, price, category, image, description };

    if (currentIndex === -1) {
        BOOKS.push(newBook);
    } else {
        BOOKS[currentIndex] = newBook; 
        currentIndex = -1;
    }

    saveBooksToLocalStorage();
    clearForm();
    displayBook();
    return false;
}

function clearForm() {
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPrice").value = "";
    document.getElementById("bookCategory").value = "";
    document.getElementById("bookImage").value = "";
    document.getElementById("bookDescription").value = "";
}

function displayBook() { 
    var container = document.getElementById("bookList");
    if (!container) return;

    container.innerHTML = ""; 

    for (let i = 0; i < BOOKS.length; i++) {
        var book = BOOKS[i];

        var card = document.createElement("div");
        card.className = "book";

        var details = document.createElement("details");

        var summary = document.createElement("summary");
        summary.textContent = book.title;

        var author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        var price = document.createElement("p");
        price.textContent = "Price: $" + book.price;

        var category = document.createElement("p");
        category.textContent = "Category: " + book.category;

        var img = document.createElement("img");
        img.src = book.image;
        img.alt = book.title;

        var description = document.createElement("p");
        description.textContent = "Description: " + book.description;

        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = function() {
            editBook(i);
        };

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            deleteBook(i);
        };

        details.appendChild(summary);
        details.appendChild(author);
        details.appendChild(price);
        details.appendChild(category);
        card.appendChild(img);
        details.appendChild(description);
        card.appendChild(details);
        card.appendChild(deleteBtn);
        card.appendChild(editBtn);
        container.appendChild(card);
    }
}

function deleteBook(index) {
    BOOKS.splice(index, 1);
    saveBooksToLocalStorage();
    displayBook();
}

function editBook(index) {
    var book = BOOKS[index];
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("bookAuthor").value = book.author;
    document.getElementById("bookPrice").value = book.price;
    document.getElementById("bookCategory").value = book.category;
    document.getElementById("bookImage").value = book.image;
    document.getElementById("bookDescription").value = book.description;
    currentIndex = index;
}

document.addEventListener("DOMContentLoaded", function() {
    displayBook();
});