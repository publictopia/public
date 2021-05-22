const { createClient } = supabase;
supabase = createClient('https://rgiduqdjiiedlptxxrbn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTQzNTAwMiwiZXhwIjoxOTM3MDExMDAyfQ.3Tg27nZImD4OoSVfTVz11tD50n09oSwwKPuIIvRc8Us')

profileScreenHTML = document.getElementById("profile-screen");
logInScreenHTML = document.getElementById("log-in-screen");
logOutButtonHTML = document.getElementById("log-out-button");
feedbackHTML = document.getElementById("feedback");
growIdHTML = document.getElementById("public-grow-id");
publicCodeHTML = document.getElementById("public-pass");

//defalut values for testing
growIdHTML.value = "public@email.com";
publicCodeHTML.value = "12345678";

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
    }
}


async function logIn(){


     let { data, error} = await supabase.auth.signIn(
       {
           email: growIdHTML.value,
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
    }

    console.log( await supabase
        .from('Worlds2')
        .select('World_name')
    );
    console.log(supabase.auth.user()); 
}




