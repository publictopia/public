

profileScreenHTML = document.getElementById("profile-screen");
logInScreenHTML = document.getElementById("log-in-screen");

//showProfileScreen();
function showProfileScreen(){
    logInScreenHTML.style.display = "none";
    profileScreenHTML.style.display = "flex"
}


function showlogInScreen(){
    logInScreenHTML.style.display = "flex";
    profileScreenHTML.style.display = "none";
}
