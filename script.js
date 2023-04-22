"use strict";

const rightFace = document.querySelector(".right-inner");
const rightBack = document.querySelector(".right-inner--backface");

const mainForm = document.querySelector(".form");
const inputs = mainForm.querySelectorAll("input");

const cardHolder = document.querySelector(".form__input--name");
const onCardHolder = document.querySelector(".face-card__p");

const cardNumber = document.querySelector(".form__input--number");
const onCardNumber = document.querySelector(".face-card__number");

const cardM = document.querySelector(".form__input--m");
const onCardM = document.querySelector(".face-card__m");

const cardY = document.querySelector(".form__input--y");
const onCardY = document.querySelector(".face-card__y");

const cardCVC = document.querySelector(".form__input--cvc");
const onCardCVC = document.querySelector(".back-card__cvc");

const submitBtn = document.querySelector(".form__submit");

inputs.forEach(addOnFocus);
submitBtn.onclick = checkForm;
cardHolder.onchange = changeName;
cardNumber.oninput = changeNumber;
cardNumber.onchange = changeNumber;
cardNumber.onchange = checkLenNumber;
cardM.onchange = changeMonth;
cardY.onchange = changeYear;
cardCVC.onchange = changeCVC;

function addOnFocus(e) {
    let parent = e.parentElement;

    e.addEventListener("focus", () => {
        parent.classList.add("form__input-border--grad");
    })
    e.addEventListener("focusout", () => {
        parent.classList.remove("form__input-border--grad");
    })
}

function changeName() {
    onCardHolder.textContent = cardHolder.value === "" ? "Jane Appleseed" : cardHolder.value;

    let parent = document.querySelector(".form__wrapper--name");
    let error = parent.querySelector(".form__error");
    let inputBorder = cardHolder.parentElement;

    if (cardHolder.value.match(/\d/g)) {
        error.textContent = "Wrong format, name cannot contain digits";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else if (cardHolder.value === "") {
        error.textContent = "Can't be blank";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else {
        error.style.display = "none";
        inputBorder.classList.remove("form__input-border--error");
    }
}

function changeNumber() {
    let v = cardNumber.value;
    let parent = document.querySelector(".form__wrapper--number");
    let error = parent.querySelector(".form__error");
    let inputBorder = cardNumber.parentElement;

    if (v.length !== 19 && v !== "") {
        let step = Math.floor(v.replace(/\s/g, "").length / 4);
        const arr = v.replace(/\s/g, "").split("");

        for (let i = 1; i <= step; i++) {
            arr.splice(i * 4 + i - 1, 0, " ");
        }

        cardNumber.value = arr.join("");
        onCardNumber.textContent = cardNumber.value;
    } else {
        onCardNumber.textContent = v === "" ? "0000 0000 0000 0000" : v;
    }

    if (cardNumber.value.match(/[^\d\s]/g)) {
        error.textContent = "Wrong format, numbers only"
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else if (cardNumber.value === "") {
        error.textContent = "Can't be blank";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else {
        error.style.display = "none";
        inputBorder.classList.remove("form__input-border--error");
    }
}

function checkLenNumber() {
    let parent = document.querySelector(".form__wrapper--number");
    let error = parent.querySelector(".form__error");
    let inputBorder = cardNumber.parentElement;

    if (cardNumber.value.length !== 19 && cardNumber.value !== "") {
        error.textContent = "Wrong number card";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    }
}

function changeMonth() {
    onCardM.textContent = cardM.value === "" ? "00" : cardM.value[0] === "0" ? cardM.value : cardM.value.length === 2 ? cardM.value : "0" + cardM.value;

    let parent = document.querySelector(".form__date");
    let error = parent.querySelector(".form__error");
    let currDate = new Date();
    let currMonth = currDate.getMonth();
    let currYear = currDate.getFullYear();
    let inputBorder = cardM.parentElement;

    if (cardM.value.match(/[^\d]/g)) {
        error.textContent = "Wrong format, numbers only"
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else if (cardM.value === "") {
        error.textContent = "Can't be blank";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else if (cardM.value <= currMonth + 1 && cardY.value <= currYear % 2000 && cardY.value != "") {
        error.textContent = "Your card is out of date";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else {
        error.style.display = "none";
        inputBorder.classList.remove("form__input-border--error");
    }
}

function changeYear() {
    onCardY.textContent = cardY.value === "" ? "00" : cardY.value;

    let parent = document.querySelector(".form__date");
    let error = parent.querySelector(".form__error");
    let currDate = new Date();
    let currYear = currDate.getFullYear();
    let inputBorder = cardY.parentElement;

    if (cardY.value.match(/[^\d]/g)) {
        error.textContent = "Wrong format, numbers only"
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else if (cardY.value === "") {
        error.textContent = "Can't be blank";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else if (cardY.value < currYear % 2000) {
        error.textContent = "Your card is out of date";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else {
        error.style.display = "none";
        inputBorder.classList.remove("form__input-border--error");
    }
}

function changeCVC() {
    onCardCVC.textContent = cardCVC.value === "" ? "000" : cardCVC.value;

    let parent = document.querySelector(".form__cvc");
    let error = parent.querySelector(".form__error");
    let inputBorder = cardCVC.parentElement;

    if (cardCVC.value.match(/[^\d]/g)) {
        error.textContent = "Wrong format, numbers only"
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else if (cardCVC.value === "") {
        error.textContent = "Can't be blank";
        error.style.display = "block";
        inputBorder.classList.add("form__input-border--error");
    } else {
        error.style.display = "none";
        inputBorder.classList.remove("form__input-border--error");
    }
}

function checkForm() {
    changeName();
    changeNumber();
    changeMonth();
    changeYear();
    changeCVC();

    const pass = document.querySelectorAll(".form__input-border--error");

    if (pass.length == 0) {
        rightFace.classList.add("right-inner--hidden");
        rightBack.classList.remove("right-inner--hidden");
    }
}