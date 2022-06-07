counter=0;
number=0;
score=localStorage.getItem("score");
document.getElementById("scoring").innerHTML=localStorage.getItem("score");
timeleft=120;
function convertSeconds(s){
    min = floor(s / 60);
    sec = s % 60;
    return(min + ":" + nf(sec,2));
}
function erase_memory(){
    localStorage.setItem("score",0);
}
function whichOne(){
    number=random(0,5);
    console.log(number);
    if (number >= 4){
        document.getElementById("object").innerHTML="door";
    }
    else if (number >= 3 && number < 4){
        document.getElementById("object").innerHTML="candle";
    }
    else if(number >= 2 && number < 3){;
        document.getElementById("object").innerHTML="leg";
    }
    else if (number >= 1 && number < 2){
        document.getElementById("object").innerHTML="rain";
    }
    else {
        document.getElementById("object").innerHTML="snowflake";
    }
}
function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
    timer=select("#timer");
    document.getElementById("scoring").innerHTML=localStorage.getItem("score");

    timer.html(convertSeconds(timeleft - counter));
    function timeIt(){
        counter++;
        timer.html(convertSeconds(timeleft - counter));
        timerEnd(timeleft - counter);
    }
    setInterval(timeIt, 1000);
}
function goBack(){
    window.location="index.html";
}
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    canvas.position(485,300);
    background('white');
    synth=window.speechSynthesis;
    canvas.mouseReleased(clasifyCanvas);
    whichOne();
}
function clearC(){
    background("white");
}
function clasifyCanvas(){
    classifier.classify(canvas,got_results);
}
function got_results(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    thing=results[0].label;
    accuricy = Math.round(results[0].confidence*100);
    document.getElementById("thing").innerHTML=thing;
    document.getElementById("accuracy").innerHTML=accuricy;
    if (thing == document.getElementById("object").innerHTML){
         console.log("you win");
         whichOne();
         score=score++;
         localStorage.setItem("score",score++);
         document.getElementById("scoring").innerHTML=score;
         counter=-1;
         background("white");
    }
}
function timerEnd(t){
    if (t <= 0){
        window.location="loose.html";
    }
}
function draw(){
    strokeWeight(12);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}