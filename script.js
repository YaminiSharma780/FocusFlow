const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-textbox");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressSpan = document.querySelector("progress-span");
const progressBarLabel = document.querySelector("#progress-bar-label");

const allProgressLabels = [
  "Raise the bar by finishing goals! had breakfast ?",
  "Well begun is half done! the goal is not too far!",
  "Ready to perform next goal ? drink plenty of water",
  "Just a step away, keep going! and stretch muscles",
  "Whoa! You just completed all the goals, time to relax",
];

// when we are sending empty object {} then we will get error
// in this code -->> input.value = allGoals[input.id].goalName;
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    goalName: "",
    completed: null,
  },
  second: {
    goalName: "",
    completed: null,
  },
  third: {
    goalName: "",
    completed: null,
  },
  fourth: {
    goalName: "",
    completed: null,
  },
};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${
  (completedGoalsCount / inputFields.length) * 100
}%`;
progressValue.textContent = `${completedGoalsCount}/${inputFields.length}`;
progressBarLabel.textContent = `${allProgressLabels[completedGoalsCount]}`;

if (completedGoalsCount == 0) {
  progressValue.style.padding = 0;
  progressValue.style.visibility = "hidden";
} else {
  progressValue.style.padding = "0 20px";
  progressValue.style.visibility = "visible";
}

inputFields.forEach((input) => {
  // fetching goal names from localStorage
  console.log(allGoals[input.id]);
  input.value = allGoals[input.id].goalName;
  // steps to append completed class in goal-container when current goal is completed
  if (allGoals[input.id].completed == true) {
    input.disabled = true;
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("input", (e) => {
    console.log(input.id, input.value);

    // preventing completed goal from getting edited
    // only edit it when you untick it which means it's not completed
    if (allGoals[input.id].completed === true) {
      return;
    }

    // steps to add new goal in localStorage
    allGoals[input.id] = {
      goalName: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
  // remove error when input field is clicked
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
});

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      // steps to set completed:true in currentGoal of allGoals in localStorage
      const inputID = checkbox.nextElementSibling.id;
      allGoals[inputID].completed = !allGoals[inputID].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressValue.style.width = `${
        (completedGoalsCount / inputFields.length) * 100
      }%`;
      progressValue.textContent = `${completedGoalsCount}/${inputFields.length}`;
      progressBarLabel.textContent = `${allProgressLabels[completedGoalsCount]}`;
      if (completedGoalsCount == 0) {
        progressValue.style.padding = 0;
        progressValue.style.visibility = "hidden";
      } else {
        progressValue.style.padding = "0 20px";
        progressValue.style.visibility = "visible";
      }

      console.log(allGoals[inputID].goalName, allGoals[inputID].completed);
      localStorage.setItem("allGoals", JSON.stringify(allGoals));

      // steps to toggle completed class in goal-container
      if (checkbox.parentElement.classList.contains("completed")) {
        checkbox.parentElement.classList.remove("completed");
        // Enable the input field if goal is marked as incomplete
        const input = document.querySelector(`#${inputID}`);
        input.disabled = false;
      } else {
        checkbox.parentElement.classList.add("completed");
        // Disable the input field if goal is marked as completed
        const input = document.querySelector(`#${inputID}`);
        input.disabled = true;
      }
    } else {
      progressBar.classList.add("show-error");
    }
  });
});
