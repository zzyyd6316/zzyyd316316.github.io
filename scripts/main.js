
/*
景区展示
 */
var myHeading = document.querySelector('h1');
var fengjingTitle = document.querySelector('h2');

if(localStorage.getItem('name')) {
    fengjingTitle.textContent = '';
}

document.querySelector("img[alt]").style.color = 'green';

var myImage = document.querySelector('img');
var timerFlag = null;
var picIndex = 0; 
var maxIndex = 4;

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

searchBtn.onclick = function() {
  if(searchInput.value !== '') {
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

    searchInput.value = '';
    searchInput.focus();
    }
  }
} 
