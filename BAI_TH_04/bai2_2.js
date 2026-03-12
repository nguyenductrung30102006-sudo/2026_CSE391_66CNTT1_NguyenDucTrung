const prices = {
Ao:150000,
Quan:200000,
Giay:300000
};

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const dateInput = document.getElementById("date");
const address = document.getElementById("address");
const note = document.getElementById("note");

const total = document.getElementById("total");
const charCount = document.getElementById("charCount");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");

const form = document.getElementById("orderForm");

function showError(id,msg){
document.getElementById(id).textContent = msg;
}

function clearError(id){
document.getElementById(id).textContent = "";
}

function validateProduct(){

if(product.value === ""){
showError("productError","Chon san pham");
return false;
}

clearError("productError");
return true;
}

function validateQuantity(){

let q = parseInt(quantity.value);

if(isNaN(q) || q < 1 || q > 99){
showError("quantityError","So luong 1-99");
return false;
}

clearError("quantityError");
return true;
}

function validateDate(){

let selected = new Date(dateInput.value);
let today = new Date();

let max = new Date();
max.setDate(today.getDate()+30);

if(selected < today){
showError("dateError","Khong duoc chon ngay qua khu");
return false;
}

if(selected > max){
showError("dateError","Khong qua 30 ngay");
return false;
}

clearError("dateError");
return true;
}

function validateAddress(){

if(address.value.trim().length < 10){
showError("addressError","Dia chi >=10 ky tu");
return false;
}

clearError("addressError");
return true;
}

function validateNote(){

if(note.value.length > 200){
showError("noteError","Khong qua 200 ky tu");
return false;
}

clearError("noteError");
return true;
}

function validatePay(){

let pay = document.querySelector("input[name='pay']:checked");

if(!pay){
showError("payError","Chon phuong thuc thanh toan");
return false;
}

clearError("payError");
return true;
}

function updateTotal(){

let p = product.value;
let q = quantity.value;

if(prices[p] && q){
let money = prices[p]*q;

total.textContent = money.toLocaleString("vi-VN");
}
}

product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);


note.addEventListener("input",function(){

let len = note.value.length;

charCount.textContent = len + "/200";

if(len > 200){
charCount.style.color="red";
}else{
charCount.style.color="black";
}

});


form.addEventListener("submit",function(e){

e.preventDefault();

let valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePay();

if(valid){

let pay = document.querySelector("input[name='pay']:checked").value;

summary.textContent =
"San pham: "+product.value+
" | So luong: "+quantity.value+
" | Tong tien: "+total.textContent+
" | Ngay giao: "+dateInput.value+
" | Thanh toan: "+pay;

confirmBox.style.display="block";

}

});


document.getElementById("confirmBtn").onclick = function(){

confirmBox.style.display="none";

form.style.display="none";

document.getElementById("success").textContent =
"Dat hang thanh cong 🎉";

};

document.getElementById("cancelBtn").onclick = function(){

confirmBox.style.display="none";

};