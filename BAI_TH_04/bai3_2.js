let currentStep = 0;

const steps = document.querySelectorAll(".step");

const progressBar = document.getElementById("progressBar");
const stepText = document.getElementById("stepText");

showStep();


function showStep(){

steps.forEach(step => step.style.display="none");

steps[currentStep].style.display="block";

progressBar.style.width = ((currentStep+1)/steps.length)*100 + "%";

stepText.textContent = "Buoc " + (currentStep+1) + " / " + steps.length;

}


/* VALIDATION STEP 1 */

function validateStep1(){

let name = document.getElementById("fullname").value.trim();
let birth = document.getElementById("birth").value;
let gender = document.querySelector("input[name='gender']:checked");

let valid = true;

if(name === ""){
document.getElementById("nameError").textContent="Nhap ho ten";
valid=false;
}else{
document.getElementById("nameError").textContent="";
}

if(birth === ""){
document.getElementById("birthError").textContent="Chon ngay sinh";
valid=false;
}else{
document.getElementById("birthError").textContent="";
}

if(!gender){
document.getElementById("genderError").textContent="Chon gioi tinh";
valid=false;
}else{
document.getElementById("genderError").textContent="";
}

return valid;

}


/* VALIDATION STEP 2 */

function validateStep2(){

let email = document.getElementById("email").value;
let pass = document.getElementById("password").value;
let confirm = document.getElementById("confirm").value;

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let valid = true;

if(!emailRegex.test(email)){
document.getElementById("emailError").textContent="Email khong hop le";
valid=false;
}else{
document.getElementById("emailError").textContent="";
}

if(pass.length < 6){
document.getElementById("passError").textContent="Mat khau >=6 ky tu";
valid=false;
}else{
document.getElementById("passError").textContent="";
}

if(pass !== confirm){
document.getElementById("confirmError").textContent="Khong trung mat khau";
valid=false;
}else{
document.getElementById("confirmError").textContent="";
}

return valid;

}


/* BUTTON NEXT */

document.getElementById("next1").onclick = function(){

if(validateStep1()){
currentStep++;
showStep();
}

};

document.getElementById("next2").onclick = function(){

if(validateStep2()){

let name = document.getElementById("fullname").value;
let birth = document.getElementById("birth").value;
let gender = document.querySelector("input[name='gender']:checked").value;
let email = document.getElementById("email").value;

document.getElementById("summary").innerHTML =
"Ho ten: "+name+"<br>"+
"Ngay sinh: "+birth+"<br>"+
"Gioi tinh: "+gender+"<br>"+
"Email: "+email;

currentStep++;
showStep();

}

};


/* BUTTON BACK */

document.getElementById("back1").onclick = function(){
currentStep--;
showStep();
};

document.getElementById("back2").onclick = function(){
currentStep--;
showStep();
};


/* SUBMIT */

document.getElementById("form").addEventListener("submit",function(e){

e.preventDefault();

document.getElementById("form").style.display="none";

document.getElementById("success").textContent="Dang ky thanh cong 🎉";

});