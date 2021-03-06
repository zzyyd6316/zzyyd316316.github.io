
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
  var month = nowTime.getMonth() +1;
  var day = nowTime.getDate();
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
景点展示
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

var myButton = document.getElementById('Login');
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
var myCookieIsOk = 0;
var maxSignCount = 8;

list.innerHTML = '';
var myHistory= [];

function writeSign() {
  list.innerHTML = '';
    for(var i = 0; i < myHistory.length; i++) {
      var itemText = myHistory[i];
      var listItem = document.createElement('li');
      listItem.textContent = itemText;
      list.appendChild(listItem);
    }
}

// 判断如果 cookie不可用那么就采用localStorage
var myCookie = $.cookie('mySignCookie');
if (myCookie) {
  myCookieIsOk = true;
  myHistory = JSON.parse(myCookie);
  if (myHistory.length > 0) {
    writeSign();
  }
}else {
  myCookieIsOk = false;
  var storedSign = localStorage.getItem('mySignCookie');
  if (storedSign){
    myHistory = JSON.parse(storedSign);
    if (myHistory.length > 0) {
      writeSign();
    }
  }
}


searchBtn.onclick = function() {
  if (searchInput.value.length > 0) {
    myHistory.unshift(searchInput.value);
    if(myHistory.length > maxSignCount) {
        myHistory.pop();
    }
    writeSign();
    var objString = JSON.stringify(myHistory);
    if (myCookieIsOk && objString.length > 0) {
      //采用本地localhost的方式实施cookie
      $.cookie('mySignCookie', objString,{expires:7,  domain:'localhost',path:'/',secure:false});
    }else {
      localStorage.setItem("mySignCookie", objString);
    }
    searchInput.value = '';
    searchInput.focus();   
      
  } 
} 

/*
  底部动画
 */

$(document).ready(function(){
  $("#Animation").click(function(){
    $("#div1").fadeOut(1500);
    $("#div2").fadeOut(3000);
    $("#div3").fadeOut(4500);
    $("#Animation").hide();
  });
});

/*
请求
 */
var reqtextS = document.getElementById("myDiv");
var reqBtn = document.getElementById("button2");
reqBtn.onclick = function(){
  var xmlhttp;
   if (window.XMLHttpRequest){
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }else{
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
        reqtextS.innerHTML=xmlhttp.responseText;
      }else {
        alert('adsda1xx');
      }
    }
    xmlhttp.open("GET","/ajax/test1.txt",true);
    xmlhttp.send();     
}
