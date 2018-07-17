

var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world11!';

var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if (mySrc == 'http://pic2.ooopic.com/12/42/25/02bOOOPIC95_1024.jpg') {
    	myImage.setAttribute('src', 'http://pic21.photophoto.cn/20111106/0020032891433708_b.jpg');
    	myHeading.textContent = '风景1--孝姑';
    }else {
    	myImage.setAttribute('src', 'http://pic2.ooopic.com/12/42/25/02bOOOPIC95_1024.jpg')
    	myHeading.textContent = '风景2--八一村';
    }
    
}

function setUserName() {
  var inputName = prompt('Please enter your name.');
  if (inputName != null && inputName != ""){
  	myHeading.textContent = 'User name is ' + inputName;
	localStorage.setItem("name", inputName);
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
  myHeading.textContent = 'User name is ' + storedName;
}
