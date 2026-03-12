let students = [];
let filteredStudents = [];
let sortAsc = true;

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addButton = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");
const rankFilter = document.getElementById("rankFilter");
const stats = document.getElementById("stats");
const sortScore = document.getElementById("sortScore");

function getRank(score) {
  if (score >= 8.5) return "Gioi";
  if (score >= 7) return "Kha";
  if (score >= 5) return "Trung binh";
  return "Yeu";
}

function renderTable() {

  tableBody.innerHTML = "";

  if (filteredStudents.length === 0) {
    tableBody.innerHTML =
      `<tr><td colspan="5" class="noresult">Khong co sinh vien nao</td></tr>`;
    return;
  }

  filteredStudents.forEach((sv, index) => {

    let tr = document.createElement("tr");

    if (sv.score < 5) {
      tr.classList.add("yeu");
    }

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${sv.name}</td>
      <td>${sv.score}</td>
      <td>${getRank(sv.score)}</td>
      <td><button data-id="${sv.id}" class="deleteBtn">Xoa</button></td>
    `;

    tableBody.appendChild(tr);

  });

  updateStats();
}

function updateStats() {

  let total = filteredStudents.length;
  let avg = 0;

  if (total > 0) {
    let sum = filteredStudents.reduce((s, sv) => s + sv.score, 0);
    avg = (sum / total).toFixed(2);
  }

  stats.textContent =
    `Tong SV: ${total} | Diem trung binh: ${avg}`;
}

function addStudent() {

  let name = nameInput.value.trim();
  let score = parseFloat(scoreInput.value);

  if (name === "") {
    alert("Ho ten khong duoc de trong");
    return;
  }

  if (isNaN(score) || score < 0 || score > 10) {
    alert("Diem phai tu 0 den 10");
    return;
  }

  students.push({
    id: Date.now(),
    name: name,
    score: score
  });

  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();

  applyFilters();
}

function applyFilters() {

  let keyword = searchInput.value.toLowerCase();
  let rank = rankFilter.value;

  filteredStudents = students.filter((sv) => {

    let matchName =
      sv.name.toLowerCase().includes(keyword);

    let matchRank =
      rank === "all" || getRank(sv.score) === rank;

    return matchName && matchRank;

  });

  filteredStudents.sort((a, b) =>
    sortAsc ? a.score - b.score : b.score - a.score
  );

  renderTable();
}

addButton.addEventListener("click", addStudent);

scoreInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addStudent();
  }
});

searchInput.addEventListener("input", applyFilters);

rankFilter.addEventListener("change", applyFilters);

sortScore.addEventListener("click", function () {

  sortAsc = !sortAsc;

  sortScore.textContent =
    sortAsc ? "Diem ▲" : "Diem ▼";

  applyFilters();

});

tableBody.addEventListener("click", function (e) {

  if (e.target.classList.contains("deleteBtn")) {

    let id = e.target.dataset.id;

    students = students.filter(sv => sv.id != id);

    applyFilters();

  }

});
