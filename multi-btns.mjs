let wrapper = document.querySelector("#wrapper");
let multiBtnContainer = document.querySelector("#multi-btn-container");
let toggleThemeBtn = document.querySelector("#toggle-theme-btn");
let menu = document.querySelector("#menu");

function setUpMultibleAttr(el, attr) {
  for (let key in attr) {
    el.setAttribute(key, attr[key]);
  }
}

function buttonMaker(amount) {
  let container = document.querySelector("#multi-btn-container");
  let btnIdArr = [];
  for (let i = 0; i < amount; i++) {
    let btn = document.createElement("button");
    // btn.innerText=`${i}` //for text in button
    //  btn.style.fontSize = "5px";
    setUpMultibleAttr(btn, { type: "button", id: `btn-b${i}` });
    btn.style.flexBasis = "30px";
    btn.style.height = "30px";
    btn.style.backgroundColor = "#fff";
    btn.style.borderRadius = "50%";
    btn.style.border = "none";
    btnIdArr.push(`btn-b${i}`);
    container.appendChild(btn);
  }
  return btnIdArr;
}
let buttonIds = buttonMaker(3400);

function addListeners(color) {
  for (let btnId of buttonIds) {
    let btn = document.querySelector(`#${btnId}`);
    btn.style.outline = "none"; //removes outline when tab key is pressed

    btn.addEventListener("click", (e) => {
      if (e.shiftKey) color = e.target.style.backgroundColor;
    });

    btn.addEventListener("mouseenter", (e) => {
      if (!e.shiftKey) {
        e.target.style.backgroundColor = typeof color === "function" ? color() : color;
      }
    });

    btn.addEventListener("dblclick", (e) => {
      multiBtnContainer.style.backgroundColor = color;
      e.target.style.border = "none";
    });
  }
}

function makeColor() {
  let hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let colorCode = [];
  for (let i = 0; i < 6; i++) {
    let randIndex = Math.floor(Math.random() * hex.length);
    let num = hex[randIndex];
    colorCode.push(num);
  }
  colorCode = colorCode.join("");
  return `#${colorCode}`;
}

document.onload = addListeners(makeColor());

toggleThemeBtn.addEventListener("click", (e) => {
  e.target.innerText = wrapper.className === "dark-theme" ? "light theme" : "dark theme";
  wrapper.classList.toggle("wrapper-black");
  menu.classList.toggle("dark-theme");
});

/* KEYBOARD SHORTCUTS TO CHANGE COLOR */
document.addEventListener("keydown", (e) => {
  if (e.key === "c") addListeners(makeColor());
  //makeColor returns a single color when function is envoked
  else if (e.key === "v") addListeners(makeColor);
  else if (e.key === "d") addListeners("#000");
  else if (e.key === "w") addListeners("#fff");
});
