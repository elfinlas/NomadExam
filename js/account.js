//
const LS_USER_ID = "userId"
const LS_USER_PW = "userPw"


const loginForm = document.getElementById("loginForm");
const joinForm = document.getElementById("joinForm")

/**
 * Login Handler
 */
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginId = document.getElementById("userId");
    const loginPw = document.getElementById("userPw");

    //valid
    if (!validInput(loginId, "User id is empty.") && !validInput(loginPw, "User pw is empty.")) {
        return;
    }

    const userId = localStorage.getItem(LS_USER_ID);
    const userPw = localStorage.getItem(LS_USER_PW);

    if ((loginId.value === userId) && (loginPw.value === userPw)) {
        
        isShowLoginView();
        console.log("login")
        return;
    }
    else { alert("login information fail.") }

    loginId.value = "";
    loginPw.value = "";
})

/**
 * Create account Handler
 */
joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const joinId = document.getElementById("joinId");
    const joinPw = document.getElementById("joinPw");

    //valid
    if (!validInput(joinId, "User id is empty.") && !validInput(joinPw, "User pw is empty.")) {
        return;
    }

    if (localStorage.getItem(LS_USER_ID) === joinId.value) {
        alert("Exist id.")
    }
    else {
        localStorage.setItem(LS_USER_ID, joinId.value)
        localStorage.setItem(LS_USER_PW, joinPw.value);
        setLoginMode(true);
    }
    
    joinId.value = "";
    joinPw.value = "";    
})


//// A tag func

/**
 * Create new Account for a tag
 */
function click4createNewAccountLink() {
    setLoginMode(false);
}

/**
 * Login for a tag
 */
function click4LoginLink() {
    setLoginMode(true);
}

//// Some utils 
function isLoginState() {
    return localStorage.getItem(LS_USER_ID) !== null
}


//// View control
function setLoginMode(isLoginMode) {
    const loginTitle = document.getElementById("login_title");
    if (isLoginMode) {
        loginTitle.innerText = "Login"
        loginForm.hidden = false;
        joinForm.hidden = true;
    }
    else {
        loginTitle.innerText = "Create Account"
        loginForm.hidden = true;
        joinForm.hidden = false;
    }
}