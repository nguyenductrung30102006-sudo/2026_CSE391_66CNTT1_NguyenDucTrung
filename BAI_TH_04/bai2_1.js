const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const terms = document.getElementById("terms");

const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^0[0-9]{9}$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function showError(input, id, message){
document.getElementById(id).textContent = message;
input.classList.add("error-border");
input.classList.remove("success-border");
}

function clearError(input, id){
document.getElementById(id).textContent = "";
input.classList.remove("error-border");
input.classList.add("success-border");
}

function validateFullname(){

let value = fullname.value.trim();

if(value === ""){
showError(fullname,"fullnameError","Khong duoc de trong");
return false;
}

if(value.length <3){
showError(fullname,"fullnameError","Phai >=3 ky tu");
return false;
}

if(!nameRegex.test(value)){
showError(fullname,"fullnameError","Chi duoc chua chu");
return false;
}

clearError(fullname,"fullnameError");
return true;
}

function validateEmail(){

let value = email.value.trim();

if(value===""){
showError(email,"emailError","Khong duoc de trong");
return false;
}

if(!emailRegex.test(value)){
showError(email,"emailError","Email khong hop le");
return false;
}

clearError(email,"emailError");
return true;
}

function validatePhone(){

let value = phone.value.trim();

if(!phoneRegex.test(value)){
showError(phone,"phoneError","SDT khong hop le");
return false;
}

clearError(phone,"phoneError");
return true;
}

function validatePassword(){

let value = password.value;

if(!passRegex.test(value)){
showError(password,"passwordError","Mat khau >=8 ky tu, co chu hoa, thuong, so");
return false;
}

clearError(password,"passwordError");
return true;
}

function validateConfirm(){

if(confirm.value !== password.value){
showError(confirm,"confirmError","Khong trung mat khau");
return false;
}

clearError(confirm,"confirmError");
return true;
}

function validateGender(){

let radios = document.querySelectorAll("input[name='gender']");
let checked = false;

radios.forEach(r=>{
if(r.checked) checked=true;
});

if(!checked){
document.getElementById("genderError").textContent="Chon gioi tinh";
return false;
}

document.getElementById("genderError").textContent="";
return true;
}

function validateTerms(){

if(!terms.checked){
document.getElementById("termsError").textContent="Phai dong y dieu khoan";
return false;
}

document.getElementById("termsError").textContent="";
return true;
}

fullname.addEventListener("blur",validateFullname);
email.addEventListener("blur",validateEmail);
phone.addEventListener("blur",validatePhone);
password.addEventListener("blur",validatePassword);
confirm.addEventListener("blur",validateConfirm);

fullname.addEventListener("input",()=>clearError(fullname,"fullnameError"));
email.addEventListener("input",()=>clearError(email,"emailError"));
phone.addEventListener("input",()=>clearError(phone,"phoneError"));
password.addEventListener("input",()=>clearError(password,"passwordError"));
confirm.addEventListener("input",()=>clearError(confirm,"confirmError"));

form.addEventListener("submit",function(e){

e.preventDefault();

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms();

if(valid){

form.style.display="none";

document.getElementById("success").textContent =
"Dang ky thanh cong! Xin chao " + fullname.value;

}

});