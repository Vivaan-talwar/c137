objects=[];


function setup(){
    canvas=createCanvas(500,350);
    canvas.position(375,250)
    
}

video="";
status1="";

function preload(){
    video=createVideo('video.mp4');
    video.hide()
}


function draw(){
    image(video,0,0,500,350);
    if(status1 != ""){
        objectDetector.detect(video,gotResult);
        
        for(var i=0; i<objects.length; i++){
document.getElementById("status").innerHTML="Status = Objects Detected";
document.getElementById("numofobjects").innerHTML="Number Of Objects Is "+ objects.length;
fill('red');
per=floor(objects[i].confidence*100);
txt=objects[i].label + " " + per + "%";
text(txt,objects[i].x+10,objects[i].y-10); //car 55%
noFill()
stroke('red');
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}

function start(){
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecing Objects";

}

function modelLoaded(){
    console.log("model is loaded");
    status1=true;
    video.loop();
    
    video.speed(1);
    video.volume(0);
}


function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}


