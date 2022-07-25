var selectedRow = null;
function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateRecord(formData);
    resetForm();
  }
}

// For reading the input values
function readFormData() {
  var formData = {};
  formData["fullName"] = document.getElementById("fullName").value;
  formData["empCode"] = document.getElementById("empCode").value;
  formData["college"] = document.getElementById("college").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.empCode;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.college;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<a onClick="onEdit(this)"><i class="fa fa-edit"> & </i></a>
                       <a onClick="onDelete(this)"><i class="fa fa-trash-o"></i></a>`;
}

// For reset after output
function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("empCode").value = "";
  document.getElementById("college").value = "";
  selectedRow = null;
}

// Edit for table data
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
  document.getElementById("college").value = selectedRow.cells[2].innerHTML;
}

// Update record
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.empCode;
  selectedRow.cells[2].innerHTML = formData.college;
}

// For delete table data
function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
  }
}

function validate() {
  isValid = true;
  if (document.getElementById("fullName").value == "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .getElementById("fullNameValidationError")
        .classList.contains("hide")
    )
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}

// Local Storage
function saveLocal() {
  let Name, Roll_Number, Subject, Storage;
  Name = document.getElementById("fullName").value;
  Roll_Number = document.getElementById("empCode").value;
  Subject = document.getElementById("college").value;
  Storage = document.getElementById("storage").value;

  let user_records = new Array();
  console.log(user_records);
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (
    user_records.some((v) => {
      return v.Roll_Number == Roll_Number;
    })
  ) {
    alert("Already exist this Roll number....?");
  } else {
    user_records.push({
      Name: Name,
      Roll_Number: Roll_Number,
      Subject: Subject,
      Storage: Storage,
    });
    localStorage.setItem("users", JSON.stringify(user_records));
  }
}

// Session Storage
function saveSession() {
  let Name, Roll_Number, Subject, Storage;
  Name = document.getElementById("fullName").value;
  Roll_Number = document.getElementById("empCode").value;
  Subject = document.getElementById("college").value;
  Storage = document.getElementById("storage").value;

  let user_records = new Array();
  user_records = JSON.parse(sessionStorage.getItem("users"))
    ? JSON.parse(sessionStorage.getItem("users"))
    : [];
  if (
    user_records.some((v) => {
      return v.Roll_Number == Roll_Number;
    })
  ) {
    alert("Already exist this Roll number....?");
  } else {
    user_records.push({
      Name: Name,
      Roll_Number: Roll_Number,
      Subject: Subject,
      Storage: Storage,
    });
    sessionStorage.setItem("users", JSON.stringify(user_records));
  }
}

// Cookies Storage
// document.cookie = "item = milk; expires = Fri, 3 July 2022 16:17:00 UTC";
// document.cookie = "location = india";

function saveCookie() {
  let Name, Roll_Number, Subject, Storage;
  Name = document.getElementById("fullName").value;
  Roll_Number = document.getElementById("empCode").value;
  Subject = document.getElementById("college").value;

  document.cookie("Name", Name);
  document.cookie("Roll_Number", Roll_Number);
  document.cookie("Subject", Subject);
}
