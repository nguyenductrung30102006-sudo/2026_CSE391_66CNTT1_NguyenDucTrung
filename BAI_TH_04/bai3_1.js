const fullname = document.getElementById("fullname");
const nameCount = document.getElementById("nameCount");

const password = document.getElementById("password");
const togglePass = document.getElementById("togglePass");

const strength = document.getElementById("strength");
const strengthText = document.getElementById("strengthText");


/* Đếm ký tự họ tên */

fullname.addEventListener("input",function(){

let len = fullname.value.length;

nameCount.textContent = len + "/50";

if(len >= 50){
nameCount.style.color="red";
}else{
nameCount.style.color="black";
}

});


/* Toggle hiện ẩn mật khẩu */

togglePass.addEventListener("click",function(){

if(password.type === "password"){
password.type = "text";
}else{
password.type = "password";
}

});


/* Thanh độ mạnh mật khẩu */

password.addEventListener("input",function(){

let pass = password.value;

let score = 0;

if(pass.length >= 6) score++;
if(/[A-Z]/.test(pass)) score++;
if(/[0-9]/.test(pass)) score++;
if(/[^A-Za-z0-9]/.test(pass)) score++;

if(score <= 1){

strength.style.width="33%";
strength.style.background="red";
strengthText.textContent="Yeu";

}

else if(score <=3){

strength.style.width="66%";
strength.style.background="orange";
strengthText.textContent="Trung binh";

}

else{

strength.style.width="100%";
strength.style.background="green";
strengthText.textContent="Manh";

}

});