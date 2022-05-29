img = "";
status = "";
object = [];
objectDetected = "";

function preload(){
    img = loadImage('living.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detection Objects";
}

function draw() {
    
    
        if(status != undefined)
        {
            image(img, 0, 0, 640, 420);
            for(var i=0; i < object.length; i++)
            {
                document.getElementById("status").innerHTML = "Status : Object Detected";

                fill(255,255,255);
                percent = floor(object[i].confidence * 100);
                text(object[i].label + " " + percent + "%", object[i].x + 5, object[i].y + 15);
                noFill();
                stroke(255,255,255);
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
            }
        }
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResults);
}   
    
function gotResults(error, results) {
    if (error) {
    console.log(error);
    } 
    console.log(results);
    object = results;
}