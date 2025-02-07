// // Input Functionality 1

// const checkBoxes = document.querySelectorAll(".custom-checkbox");
// const goalContainers = document.querySelectorAll(".goal-container");

// const progressValue = document.querySelector(".progress-value");
// let barValue = 0;
// let barPercentage = 33.3;

// checkBoxes.forEach((checkbox) => {
//   checkbox.addEventListener("click", () => {
//     if (checkbox.parentElement.classList.contains("completed")) {
//       checkbox.parentElement.classList.remove("completed");
//       barValue--;
//       if (barValue === 0) {
//         progressValue.style.padding = 0;
//       }
//     } else {
//       checkbox.parentElement.classList.add("completed");
//       barValue++;
//       if (barValue === 1) {
//         progressValue.style.padding = "0 20px";
//       }
//     }
//     progressValue.textContent = `${barValue}/3 Completed`;
//     progressValue.style.width = `${barPercentage * barValue}%`;
//   });
// });

// -----------------------------------

// Input Functionality 2

const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-textbox");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressSpan = document.querySelector("progress-span");

let barValue = 0;
let barPercentage = 33.33;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      if (checkbox.parentElement.classList.contains("completed")) {
        checkbox.parentElement.classList.remove("completed");
        barValue--;
        if (barValue == 0) {
          progressValue.style.padding = 0;
        }
      } else {
        checkbox.parentElement.classList.add("completed");
        barValue++;
        progressValue.style.padding = "0 20px";
      }
      progressValue.textContent = `${barValue}/3 Completed`;
      progressValue.style.width = `${barPercentage * barValue}%`;
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
});
