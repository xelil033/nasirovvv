const allUnits = document.querySelectorAll(".unit");

const fromBox = document.querySelector(".from-group");
const toBox = document.querySelector(".to-group");

const inputFrom = document.querySelector(".input-from");
const inputTo = document.querySelector(".input-to");

const rateFrom = document.querySelector(".rate-from");
const rateTo = document.querySelector(".rate-to");

let curFrom = fromBox.querySelector(".active").textContent;
let curTo = toBox.querySelector(".active").textContent;

const KEY = "4bdd6015fdc936c7e4c22c1439ac6a2f";

function loadRate(a, b) {
    fetch(`https://api.exchangerate.host/convert?from=${a}&to=${b}&amount=1&access_key=${KEY}`)
        .then(r => r.json())
        .then(d => {
            rateFrom.textContent = `1 ${a} = ${d.result.toFixed(4)} ${b}`;
            rateTo.textContent = `1 ${b} = ${(1 / d.result).toFixed(4)} ${a}`;
        });
}

function calcFrom() {
    if (!inputFrom.value) {
        inputTo.value = "";
        return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${curFrom}&to=${curTo}&amount=${inputFrom.value}&access_key=${KEY}`)
        .then(r => r.json())
        .then(d => inputTo.value = d.result.toFixed(4));
}

function calcTo() {
    if (!inputTo.value) {
        inputFrom.value = "";
        return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${curTo}&to=${curFrom}&amount=${inputTo.value}&access_key=${KEY}`)
        .then(r => r.json())
        .then(d => inputFrom.value = d.result.toFixed(4));
}

allUnits.forEach(btn => {
    btn.onclick = () => {
        const parent = btn.parentElement;
        parent.querySelectorAll(".unit").forEach(u => u.classList.remove("active"));
        btn.classList.add("active");

        curFrom = fromBox.querySelector(".active").textContent;
        curTo = toBox.querySelector(".active").textContent;

        loadRate(curFrom, curTo);
        calcFrom();
    };
});

inputFrom.addEventListener("input", calcFrom);
inputTo.addEventListener("input", calcTo);

loadRate(curFrom, curTo);