const lpwField = document.getElementById("lpw-field");
const lpwRadios = document.querySelectorAll('input[name="lpw"]');
const resultsDiv = document.getElementById("results");

lpwRadios.forEach(r => {
  r.addEventListener("change", () => {
    lpwField.style.display = r.value === "yes" ? "block" : "none";
  });
});

const grades = [
  { grade: "O", minPercent: 91 },
  { grade: "A+", minPercent: 81 },
  { grade: "A", minPercent: 71 },
  { grade: "B+", minPercent: 61 },
  { grade: "B", minPercent: 51 },
  { grade: "C", minPercent: 46 },
  { grade: "P", minPercent: 40 }
];

document.getElementById("calcBtn").addEventListener("click", () => {
  const ce = Number(document.getElementById("ce").value);
  const hasLPW = document.querySelector('input[name="lpw"]:checked').value === "yes";
  const lpw = hasLPW ? Number(document.getElementById("lpwMarks").value) : 0;

  if (isNaN(ce) || ce < 0 || ce > 100) return alert("Enter valid CE marks");
  if (hasLPW && (isNaN(lpw) || lpw < 0 || lpw > 100)) return alert("Enter valid LPW marks");

  const gradeInfo = grades.find(g => g.grade === document.getElementById("grade").value);

  let internal = hasLPW ? 0.3 * ce + 0.3 * lpw : 0.6 * ce;
  let needed = Math.ceil((gradeInfo.minPercent - internal) / 0.4);

  if (needed < 33) needed = 33;

  document.getElementById("resultGrade").textContent = gradeInfo.grade;
  document.getElementById("resultMarks").textContent = needed > 100 ? "Not possible" : needed;

  resultsDiv.style.display = "block";
});

document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("ce").value = "";
  document.getElementById("lpwMarks").value = "";
  document.getElementById("grade").value = "O";
  lpwRadios[0].checked = true;
  lpwField.style.display = "block";
  resultsDiv.style.display = "none";
});
