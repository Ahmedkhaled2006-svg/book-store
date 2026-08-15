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
function validateLoginForm() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return false;
    }
    else if (email.includes("@") === false) {
        alert("Please enter a valid email address.");
        return false;
    }
    else if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }


    return true;
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
      window.location.href = "dashboard.html";
       return false;
    }
}
