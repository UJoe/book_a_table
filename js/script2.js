function _load() {
  const iName = document.querySelector("input[name='username']");
  const iEmail = document.querySelector("input[name='email']");
  const iDate = document.querySelector("input[name='date']");
  const iTime = document.querySelector("input[name='time']");
  const iNumber = document.querySelector("input[name='persons']");
  const iBtn = document.getElementById("submit_Btn");
  const rBtn = document.getElementById("reservation_btn");
  const rForm = document.getElementById("form_container");
  iBtn.disabled = true;
  iTime.readOnly = true;
  // No need
  //rForm.style.display = "none";
  var nameOK = false;
  var emailOK = false;
  var dateOK = false;
  var timeOK = false;
  var numberOK = false;
  var timo;

  iName.addEventListener("blur", checkName);
  iEmail.addEventListener("blur", checkEmail);
  iDate.addEventListener("blur", checkDate);
  iTime.addEventListener("blur", checkTime);
  iNumber.addEventListener("blur", checkNumber);
  iBtn.addEventListener("click", logData);
  rBtn.addEventListener("click", reservation);

  function message(x, text) {
    const m = document.getElementById("message" + x);
    m.className = "messageDiv appear";
    m.innerHTML = text;
    clearTimeout(timo);
    timo = setTimeout(function () {
      m.className = "messageDiv disappear";
    }, text.length * 70);
    timo = setTimeout(function () {
      m.innerHTML = "";
    }, text.length * 70 + 2001);
  }

  function checkName() {
    if (iName.value.length < 3) {
      message(1, "Legalább 3 karaktert írjon be!");
      nameOK = false;
      iBtn.disabled = true;
      iName.focus();
    } else {
      nameOK = true;
      checkSubmit();
    }
  }

  function checkEmail() {
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (iEmail.value.match(mailformat)) {
      emailOK = true;
      checkSubmit();
    } else {
      message(2, "Az emailcím hibásan van megadva.");
      emailOK = false;
      iBtn.disabled = true;
      iEmail.focus();
    }
  }

  function checkDate() {
    let curDate = Math.floor(new Date() / (1000 * 60 * 60 * 24));
    let inpDate = Math.floor(new Date(iDate.value) / (1000 * 60 * 60 * 24));
    let difDate = inpDate - curDate;
    if (difDate < 0) {
      message(3, "A megadott nap már elmúlt.");
      dateOK = false;
      iBtn.disabled = true;
      iTime.readOnly = true;
      iDate.focus();
    } else {
      dateOK = true;
      iTime.readOnly = false;
      checkSubmit();
    }
  }

  function checkTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();

    let bookedTime = document.getElementById("time_input").value;
    let bookedHour, bookedMin;
    bookedTime = bookedTime.split(":");
    bookedHour = parseInt(bookedTime[0]);
    bookedMin = parseInt(bookedTime[1]);

    let bookedDate = document.querySelector("input[name='date']").value;
    let bookedYear, bookedMonth, bookedDay;
    bookedDate = bookedDate.split("-");
    bookedYear = parseInt(bookedDate[0]);
    bookedMonth = parseInt(bookedDate[1]) - 1;
    bookedDay = parseInt(bookedDate[2]);

    if (
      bookedYear === year &&
      bookedMonth === month &&
      bookedDay === day &&
      bookedHour < 21 &&
      bookedHour >= 8
    ) {
      if (bookedHour > hour + 1) {
        timeOK = true;
        checkSubmit();
      } else if (bookedHour === hour + 1 && bookedMin > min) {
        timeOK = true;
        checkSubmit();
      } else {
        message(4, "Legalább 1 órával előre lehet csak asztalt foglalni.");
        timeOK = false;
        iBtn.disabled = true;
        iTime.focus();
      }
    } else {
      let curDate = Math.floor(new Date() / (1000 * 60 * 60 * 24));
      let inpDate = Math.floor(new Date(iDate.value) / (1000 * 60 * 60 * 24));
      if (inpDate > curDate && bookedHour < 21 && bookedHour >= 8) {
        timeOK = true;
        checkSubmit();
      } else {
        message(4, "A megadott időpont nem megfelelő.");
        timeOK = false;
        iBtn.disabled = true;
      }
    }
  }

  function checkNumber() {
    let guests = parseInt(iNumber.value);
    if (guests > 0 && guests < 101) {
      numberOK = true;
      checkSubmit();
    } else {
      message(5, "A számnak 1 és 100 között kell lennie.");
      numberOK = false;
      iBtn.disabled = true;
      iNumber.focus();
    }
  }

  function logData() {
    console.log("Név: " + iName.value);
    console.log("Email cím: " + iEmail.value);
    console.log("Dátum: " + iDate.value);
    console.log("Időpont: " + iTime.value);
    console.log("Vendégek száma: " + iNumber.value);
    message(
      6,
      "<br><br>Várjuk szeretettel!<br>Az F12-vel megkapja visszaigazolását."
    );
    document.querySelector("form").reset();
    iBtn.disabled = true;
  }

  function checkSubmit() {
    if (nameOK && emailOK && dateOK && timeOK && numberOK) {
      iBtn.disabled = false;
    }
  }
  /*   function reservation(){
    rForm.style.display = "block";
  } */
}

window.addEventListener("load", _load);
