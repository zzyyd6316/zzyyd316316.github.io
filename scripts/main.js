

var myHeading = document.querySelector('h1');
var fengjingTitle = document.querySelector('h2');

if(localStorage.getItem('name')) {
    fengjingTitle.textContent = '';
}

// var myImage = document.querySelector('img');
// myImage.onclick = function() {
//     var mySrc = myImage.getAttribute('src');
//     if (mySrc == 'http://pic2.ooopic.com/12/42/25/02bOOOPIC95_1024.jpg') {
//       myImage.setAttribute('src', 'http://pic21.photophoto.cn/20111106/0020032891433708_b.jpg');
//       fengjingTitle.textContent = '风景1--孝姑';
//     }else {
//       myImage.setAttribute('src', 'http://pic2.ooopic.com/12/42/25/02bOOOPIC95_1024.jpg')
//       fengjingTitle.textContent = '风景2--八一村';
//     }
    
// }

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
