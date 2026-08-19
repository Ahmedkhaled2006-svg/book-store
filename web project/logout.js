  function logout() 
 {
   localStorage.removeItem("currentuser");
   window.location.href = "home.html";
 }
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