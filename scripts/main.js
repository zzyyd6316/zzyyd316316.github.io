/*
  导入jQuery
 */

$(document).ready(function(){
  $("#Animation").click(function(){
    $("#div1").fadeOut(1500);
    $("#div2").fadeOut(3000);
    $("#div3").fadeOut(4500);
    $("#Animation").hide();
  });
});
var obj = [
             {"name":"Tom","age":13},
             {"name":"Jack","age":14},
             {"name":"Mary","age":16},
           ]
 var objString = JSON.stringify(obj); //JSON 数据转化成字符串
/*
  时间
 */

function checkTime(value){
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function showTime(){
  var nowTime = new Date();
  var year = nowTime.getFullYear();
  var month = nowTime.getMonth();
  var day = nowTime.getDay();
  var hour = nowTime.getHours();
  var minute = nowTime.getMinutes();
  var second = nowTime.getSeconds();

  hour = checkTime(hour);
  minute = checkTime(minute);
  second = checkTime(second);
  var timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
  document.getElementById('timeText').innerHTML = timeStr;
  setTimeout('showTime()', 1000);
}

showTime();
/*
景区展示
 */
var myHeading = document.querySelector('h1');
var fengjingTitle = document.querySelector('h2');
// document.getElementById("image").title.color = 'green';
document.getElementById("image").style.color="blue";

if(localStorage.getItem('name')) {
    fengjingTitle.textContent = '';
}

document.querySelector("img[alt]").style.color = 'green';
document.querySelector(".signLabel").style.color = 'red';

var myImage = document.querySelector('img');
var timerFlag = null;
var picIndex = 0; 
var maxIndex = 5;

function showImg(){
  picIndex = picIndex + 1;
  if (picIndex > maxIndex) {
    picIndex = 1;
  }
  var picPath = 'images/xiaogu' + picIndex + '.jpg';
  myImage.setAttribute('src', picPath);
  fengjingTitle.textContent = '景点' + picIndex;
}

function startPicShow(){
  if (timerFlag == null) {
    timerFlag = setInterval(() => {
        showImg();
    }, 2500);
  }
}


function setUserName() {
  var inputName = prompt('请输入您的名字');
  if (inputName != null && inputName != ""){
    myHeading.textContent = '你好！' + inputName + ' 欢迎来到犍为县孝姑镇!';
    localStorage.setItem("name", inputName);
    startPicShow();
  }
}

var myButton = document.querySelector('button');
myButton.onclick = function() {
  setUserName();
}

if(!localStorage.getItem('name')) {
    setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.textContent = '你好！' + storedName + ' 欢迎来到犍为县孝姑镇!';;
  startPicShow();
}



/*
签名
 */

var list = document.querySelector('.output ul');
var searchInput = document.querySelector('.output input');
var searchBtn = document.querySelector('.output button');

list.innerHTML = '';
var myHistory= [];
var myCookie = $.cookie('mySignCookie');
if (myCookie) {
  myHistory = JSON.parse(myCookie);
}


searchBtn.onclick = function() {
  if (searchInput.value.length > 0) {
    myHistory.unshift(searchInput.value);
    list.innerHTML = '';
    for(var i = 0; i < myHistory.length; i++) {
      var itemText = myHistory[i];
      var listItem = document.createElement('li');
      listItem.textContent = itemText;
      list.appendChild(listItem);
    }

    if(myHistory.length >= 5) {
      myHistory.pop();
    }

    var objString = JSON.stringify(myHistory);
    $.cookie('mySignCookie', objString, {
    expires:7,  
    domain:'zzyyd316316.github.io',
    path:'/',
    secure:false
});

    searchInput.value = '';
    searchInput.focus();
    }
} 
