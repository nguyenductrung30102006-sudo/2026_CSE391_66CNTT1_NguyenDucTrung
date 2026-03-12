let students = [];
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addButton = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

function getRank(score){
    if(score >= 8.5) return "Gioi";
    if(score >= 7) return "Kha";
    if(score >= 5) return "Trung binh";
    return "Yeu";
}

function renderTable(){
    tableBody.innerHTML = "";
    students.forEach((sv, index) =>{
        let tr = document.createElement("tr");
        if(sv.score < 5){
            tr.classList.add("yeu");
        }
        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td><button data-index = "${index}" class = "deleteBtn">Xoa</button></td>
        </tr>`;
        tableBody.appendChild(tr);

    });
    updateStats();
}

function updateStats(){
    let total = students.length;
    let avg = 0;
    if (total > 0){
        let sum = students.reduce((s, sv) => s + sv.score, 0);
        avg = (sum / total).toFixed(2);
    }
    stats.textContent = `Tong SV: ${total} | Diem trung binh: ${avg}`; 
}

function addStudent(){
    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);
    if(name == ""){
        alert("Ho ten khong duoc de trong");
        return;
    }
    if(isNaN(score) || score < 0 || score > 10){
        alert("Diem  phai tu 0 dn 10");
        return;
    }
    students.push({name, score});
    renderTable();
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

addButton.addEventListener("click", addStudent);
scoreInput.addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        addStudent();
    }
});

tableBody.addEventListener("click", function(e){
    if(e.target.classList.contains("deleteBtn")){
        let index = e.target.getAttribute("data-index");
        students.splice(index, 1);
        renderTable();
    }
});