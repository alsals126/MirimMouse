let typingBool = false;

const content = "안녕하세요 저는 초록쌤이에요."
const text = document.querySelector(".text")
let index = 0;

if(typingBool==false){ // 타이핑이 진행되지 않았다면 
    typingBool=true; 
    
    var tyInt = setInterval(typing,200); // 반복동작 
  } 

function typing(){
    text.textContent += content[index++]
    if(index >= content.length){
        clearInterval(tyInt);
    }
}
