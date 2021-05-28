const { createClient } = supabase;
supabase = createClient('https://rgiduqdjiiedlptxxrbn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTQzNTAwMiwiZXhwIjoxOTM3MDExMDAyfQ.3Tg27nZImD4OoSVfTVz11tD50n09oSwwKPuIIvRc8Us')

/* HTML integration */
profileScreenHTML = document.getElementById("profile-screen");
logInScreenHTML = document.getElementById("log-in-screen");
logOutButtonHTML = document.getElementById("log-out-button");
feedbackHTML = document.getElementById("feedback");
growIdHTML = document.getElementById("public-grow-id");
publicCodeHTML = document.getElementById("public-pass");
searchGrowIdHTML = document.getElementById("SearchGrowId");
searchResults = document.getElementById("search-results");

//defalut values for testing
/* growIdHTML.value = "public@email.com";
publicCodeHTML.value = "12345678"; */


profileScreenHTML.style.display = "none";
logInScreenHTML.style.display = "none";
//showProfileScreen();
function showProfileScreen(){
    logInScreenHTML.style.display = "none";
    profileScreenHTML.style.display = "flex"
}


function showlogInScreen(){
    logInScreenHTML.style.display = "flex";
    profileScreenHTML.style.display = "none";
}

async function logOut(){
    let { error } = await supabase.auth.signOut();
    if(error != null){
        console.log(error.message);
        feedbackHTML.innerHTML = error.message;   
    }
    else{
        logOutButtonHTML.style.color = "#EFEFEF";
        growIdHTML.value = "";
        publicCodeHTML.value = "";
        feedbackHTML.innerHTML = "";
    }
}
/* supabase.auth.signUp(
    {
        email: "arsglass@gmail.com",
        password: "testing2@",
    }
); */

async function logIn(){

    if(growIdHTML.value.length > 3 && publicCodeHTML.value.length > 3){
        let { data, error} = await supabase.auth.signIn(
        {
            email: growIdHTML.value.toLowerCase() + "@gmail.com",
            password: publicCodeHTML.value,
        }
        );
        if(error != null){
            console.log(error.message);
            feedbackHTML.innerHTML = error.message; 
        }
        else{
            logOutButtonHTML.style.color = "rgba(255, 0, 0, 0.678)"
            showProfileScreen();
            feedbackHTML.innerHTML="";
        }
    }
    else{
        feedbackHTML.innerHTML = "Grow Id or Public code missing";
    }
}

async function SearchGrowId(){
    let { data: Worlds2, error } = await supabase
    .from('Worlds2')
    .select('World_name')
    .contains({World_name: searchGrowIdHTML.value})
 

    console.log(Worlds2);
    console.log(error);
}

async function Search(){
    if(searchGrowIdHTML.value.length > 3){
        let { data: Name, error } = await supabase
        .from('Users')
        .select('Name')
        .ilike('Name', '%'+searchGrowIdHTML.value +'%'); 
        console.log(error);
        searchResults.innerHTML = "";
        Name.forEach(element => createSearchResult(element.Name));
    }
}

function createSearchResult(GrowID){
    var searchResultContainer = document.createElement("div");
    searchResultContainer.classList.add("search-result");

    var searchResult = document.createElement("h1");
    searchResult.innerHTML =  GrowID;

    var searchResultButton = document.createElement("button");
    var ButtonIconContainer = document.createElement("h4");
    var ButtonIcon = document.createElement("i");

    ButtonIcon.classList.add("fas");
    ButtonIcon.classList.add("fa-arrow-right");
    ButtonIconContainer.appendChild(ButtonIcon);

    searchResultButton.appendChild(ButtonIconContainer);
    searchResultButton.classList.add("search-profile-button");

    searchResultContainer.appendChild(searchResult);
    searchResultContainer.appendChild(searchResultButton);
 
    searchResults.appendChild(searchResultContainer);

}
