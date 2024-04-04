// menubtn code
let menucontent = document.getElementById("menucontent");

let btn = document.getElementById("menubtn");
let butn = false;
btn.addEventListener("click", () => {
  if (!butn) {
    menucontent.style.left = "0";
    butn = true;
  } else {
    menucontent.style.left = "-340px";
    butn = false;
  }
});

// Ask user to allow notification access
if("Notification" in window){
  Notification.requestPermission().then(function(permission){
      if(Notification.permission !== "granted"){
          alert("Please allow notification access!");
          location.reload();
      }
  });
}

var timeoutIds = [];

function scheduleReminder(){
  var task = document.getElementById("task").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;

  var timeString = date + " " + time;
  var scheduledTime = new Date(timeString);
  var currentTime = new Date();
  var timeDiff = scheduledTime - currentTime;

  if (timeDiff > 0){
      addReminder(task, timeString);

      var timeoutId = setTimeout(function () {
          // document.getElementById("notificationSound").play();

          var notification = new Notification(task, {
           requireInteraction: true,
          });
      }, timeDiff);

      timeoutIds.push(timeoutId);
  } else {
      alert("The schedule time is in the past!")
  }
}

function addReminder(task, timeString){
  var tableBody = document.getElementById("reminderTableBody");

  var row = tableBody.insertRow();
  
  var taskCell = row.insertCell(0);
  var dateTimeCell = row.insertCell(1);
  var actionCell = row.insertCell(2);

  taskCell.innerHTML = task;
  dateTimeCell.innerHTML = timeString;
  actionCell.innerHTML = `<button onclick = "deleteReminder(this)">Delete</button>`;
}

function deleteReminder(button){
  var row = button.closest("tr");
  var index = row.rowIndex;

  clearTimeout(timeoutIds[index - 1]);
  timeoutIds.splice(index - 1, 1);

  row.remove();
}