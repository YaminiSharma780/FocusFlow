const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-textbox");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressSpan = document.querySelector("progress-span");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

// const allGoals = {
//   first: {
//     goalName: "Learn JavaScript",
//     completed: false,
//   },
//   second: {
//     goalName: "Learn React",
//     completed: false,
//   },
//   third: {
//     goalName: "Learn NextJS",
//     completed: false,
//   },
// };

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
      console.log(progressBar.classList);
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  console.log(allGoals[input.id]);
  input.value = allGoals[input.id].goalName;
  if (allGoals[input.id].completed == true) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    console.log(input.id, input.value);
    allGoals[input.id] = {
      goalName: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
