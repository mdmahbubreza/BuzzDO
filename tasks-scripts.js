const inputBox = document.getElementById("input-task");
const listContainer = document.getElementById("list-container");
function addTask() {
  if (inputBox.value == "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// yaha menubtn ka code ha
let menucontent = document.getElementById("menucontent");

let btn = document.getElementById("menubtn");
let butn = false;
btn.addEventListener("click", () => {
  if (!butn) {
    menucontent.style.left = "0";
    butn = true;
  } else {
    menucontent.style.left = "-340px"
    butn = false;
  }
});
