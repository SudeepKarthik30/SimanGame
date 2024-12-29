let gameSeq = [];
let userSeq = [];
let preLevel = 0;
let btns = ["red","purple","yellow","green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
   if(started == false){
    console.log("Game started");
    started = true;
    levelUp();
   }
});

function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random()*3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Press any key to start <br> Your Score : ${level}`;
        document.querySelector("body").style.background = "red";
        setTimeout(function(){
                document.querySelector("body").style.background = "white";
        },1000);
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn = this;
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    userFlash(btn);

    checkAns(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");

for(btn of allBtn){
    btn.addEventListener("click",btnPress);
}
function reset(){
    if(level>preLevel){
       let h3 = document.querySelector("h3"); 
       preLevel = level;
       h3.innerText = `New Highest Score : ${preLevel}`;
    }
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
}