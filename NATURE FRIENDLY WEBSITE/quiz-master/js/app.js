const correctAns = ["B", "D", "B", "A", "B", "B", "B", "A", "A", "D"];
const form = document.querySelector(".quiz-form");
const label = document.querySelectorAll(".quiz-form__ans");
const result = document.querySelector(".quiz__heading");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;
  const userAns = [
    form.q1,
    form.q2,
    form.q3,
    form.q4,
    form.q5,
    form.q6,
    form.q7,
    form.q8,
    form.q9,
    form.q10,
  ];

  //check ans
  userAns.forEach((ans, i) => {
    if (ans.value === correctAns[i]) {
      score += 10;
      for (let i = 0; i < 4; i++) {
        const isChecked = ans[i].checked;
        if (isChecked) {
          ans[i].parentElement.classList.add("correct");
        }
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const isChecked = ans[i].checked;
        if (isChecked) {
          ans[i].parentElement.classList.add("wrong");
        }
      }
    }
  });

  scrollTo(0, 0);
  result.style.display = "block";
  let output = 0;
  const timer = setInterval(() => {
    result.querySelector(".result").textContent = `${output}%`;
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 25);
});
