//To-Do
const API_KEY = "969eee87329876300c1b6c062f94fc27";

const loginView = document.getElementById("login_div");
const loadingView = document.getElementById("loading_div");
const contentView = document.getElementById("content_view");

const contentHeadView = document.getElementById("content_head_view")
const contentMainView = document.getElementById("content_main_view")

//시작 시 Background 처리
document.addEventListener("DOMContentLoaded", () => {
    isShowLoginView();
});

//이미지 태그 고정
document.getElementById('content_background_img').ondragstart = function() { return false; };

/**
 * 로그인 뷰 또는 컨텐츠 뷰 로드 체크
 */
function isShowLoginView() {
    if (isLoginState()) {
        loginView.hidden = true;
        loadingView.hidden = false;
        contentView.hidden = false;
        initWithBackground();
    }
    else {
        loginView.hidden = false;
        loadingView.hidden = true;
        contentView.hidden = true;
        setLoginMode(true);
    }
}


//화면 초기화 처리
function initWithBackground() {
    contentHeadView.hidden = true;
    contentMainView.hidden = true;

    const width = window.innerWidth;
    const hight = window.innerHeight;

    const img = document.getElementById("content_background_img");
    const imgUrl = `https://picsum.photos/${width}/${hight}?blur=10`;
    let preloadImg = document.createElement("img");
    preloadImg.src = imgUrl;

    preloadImg.addEventListener("load", (event) => {
        const loadingView = document.getElementById("loading_div");
        loadingView.hidden = true;
        const imgBackView = document.getElementById("content_background_view");
        imgBackView.style.background = "black"
        img.src = imgUrl;
        setContentView();
        preloadImg = null;
    })
}

function setContentView() {
    initWithTime(); //시간을 띄워준다.
    contentHeadView.hidden = false;
    contentMainView.hidden = false;
    document.getElementById("welcome_title").innerText = `안녕하세요 \r\n ${localStorage.getItem(LS_USER_ID)} 님`;
    initWithToDo();
    initWithGeoData();
}


//Time
//현재 시간 구하는 함수
function initWithTime() {
    setLabel4DateTime(getCurrentDate());
    setInterval(()=> setLabel4DateTime(getCurrentDate()),1000);
}

//시간 쪽 처리
function setLabel4DateTime(dateTime) {
    const date = dateTime.split("-")[0].split("_")
    const time = dateTime.split("-")[1].split(":")
    document.getElementById("now_date").innerText = `${date[0] }년 ${date[1]}월 ${date[2]}일`
    document.getElementById("now_time").innerText =  `${time[0] }시 ${time[1]}분 ${time[2]}초`
}



//// Geolocation 
function initWithGeoData() {
    navigator.geolocation.getCurrentPosition(handle4GeoSuccess, handle4GeoFail);    
}

function handle4GeoSuccess(postion) {
    const lat = postion.coords.latitude;
    const lng = postion.coords.longitude;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("location").innerText = data.name;
        document.getElementById("weather").innerText = `${Math.floor(data.main.temp)} / ${data.weather[0].main}`;
    })
}

function handle4GeoFail(err) {
    alert("날씨와 지역 정보를 받아올 수 없습니다")
    console.log("err = ", err)
}


//// To Do

function initWithToDo() {
    let todoItem = JSON.parse(localStorage.getItem("todo")); //[]
    if (todoItem !== null) {
        Object.keys(todoItem).forEach((item) => {
            addView4ToDoItem(item, todoItem[item]);
        }) 
    }
}

//Add To-Do Item
document.getElementById("todoForm").addEventListener("submit", (event)=> {
    event.preventDefault();
    const input = document.getElementById("todoInput");
    
    //Save LocalStorage
    const itemId = `todo-${new Date().getTime()}`
    const itemValue = input.value;

    if (localStorage.getItem("todo") === null) {
        const tmpJsonItem = {}
        tmpJsonItem[itemId] = itemValue;
        localStorage.setItem("todo", JSON.stringify(tmpJsonItem));
        //localStorage.setItem("todo", JSON.stringify([JSON.stringify(item)]))
    }else {
        let todoItem = JSON.parse(localStorage.getItem("todo")); //[]
        todoItem[itemId] = itemValue;
        localStorage.setItem("todo", JSON.stringify(todoItem));
    }

    // if (localStorage.getItem("todo") === null) {
    //     //localStorage.setItem("todo", JSON.stringify([JSON.stringify(item)]))
    // }else {
    //     let todoItem = JSON.parse(localStorage.getItem("todo")); //[]
    //     todoItem.push(JSON.stringify(item));
    //     localStorage.setItem("todo", JSON.stringify(todoItem));
    // }

    //View
    addView4ToDoItem(itemId, itemValue);
    input.value = "";
})

function addView4ToDoItem(id, item) {
    const ul = document.getElementById("todo_item_list");
    const li = document.createElement("li");
    li.setAttribute("id", id)
    li.style.marginBottom = "10px";
    li.innerHTML = `${item} <a href="#" onclick="deleteToDoItem('${id}')" style='color:white' >    [삭제]  </a>`
    ul.appendChild(li);
}

function deleteToDoItem(id) {
    //Elements delete 
    document.getElementById(id).remove()
    
    //item delete
    let todoItem = JSON.parse(localStorage.getItem("todo")); //[]
    Object.keys(todoItem).forEach((item) => {
        if (item === id) {
            console.log("find!!")
            delete todoItem[id];
            return;
        }
    }); 
    localStorage.setItem("todo", JSON.stringify(todoItem));
}
