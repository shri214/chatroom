const socket = io();
let inputVal = document.getElementById("input-message");
let btn = document.querySelector(".send-btn");
let message_box = document.querySelector(".message-box");
let nameVal = document.querySelector("#name");
let join = document.querySelector(".join");
let exit = document.querySelector(".exit");
let audio = new Audio("Beep Beep.mp3");

let userName = "";
//taking input as a user name
join.addEventListener("click", () => {
  userName = nameVal.value.trim();
  if (userName != "") {
    document.querySelector(".primary > h1").innerHTML = "Welcome " + userName;
    document.querySelector(".login").style.display = "none";
    document.querySelector(".hide").style.display = "block";

    //taking uesername as a para and send to the backed
    socket.emit("entered", userName);
  } else {
    alert("please enter your user name");
    return;
  }
});

//while pressing enter it work as same as like click on join chat
nameVal.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    join.click();
  }
});

//sending message
btn.addEventListener("click", () => {
  const data = {
    username: userName,
    message: inputVal.value.trim(),
  };
  socket.emit("message", data);
  addingMessage(data, true);
});

socket.on("message", (data) => {
  if (data.username !== userName) {
    addingMessage(data, false);
  }
});

socket.on("entered", (data) => {
  if (data !== userName) {
    message_box.innerHTML += `<div class="notification"> ${data} is joined the group</div>`;
  }
});

function addingMessage(data, sender) {
  if (sender) {
    message_box.innerHTML += `<div class="received">
    <p><span>${data.username} : </span>  ${data.message}</p>
    </div>`;
  } else {
    message_box.innerHTML += `<div class="send">
    <p><span>${data.username} : </span>  ${data.message}</p>
    </div>`;
    audio.play();
  }
  inputVal.value = "";
}

inputVal.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

exit.addEventListener("click", () => {
  socket.emit("exits", userName);
  console.log("exits is clicked");
});

//exiting the persons
socket.on("exits", (data) => {
  if (userName !== data) {
    message_box.innerHTML += `<div class="notification"> ${data} exit from the group</div>`;
  } else {
    document.querySelector(".login").style.display = "block";
    document.querySelector(".hide").style.display = "none";
  }
});
