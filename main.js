prediction = ""

Webcam.set({
    width: 340,
    height: 340,
    png_quality: 90,
    image_format: 'png',
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="' + data_uri + '"/>';
});
}

console.log('ml5 version:', ml5.version);
 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Df07nM26p/model.json',modelLoaded);

 function modelLoaded(){
    console.log('model loaded');
 }

 function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The prediction is -" + results1;
    var utterthis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterthis);
 }

 function check(){
    img= document.getElementById("image_captured")
    classifier.classify(img, gotResult)
 }

 function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        results1 = results[0].label
        results1_c = results[0].confidence
        console.log(results1)
        document.getElementById("gesture_prediction").innerHTML = results[0].label
        document.getElementById("g_confidence").innerHTML = results[0].confidence
        speak()
        if(results1 == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if(results1 == "Good"){
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if(results1 == "Bad"){
            document.getElementById("update_emoji").innerHTML = "&#128078;"
        }
        if(results1 == "Rock"){
            document.getElementById("update_emoji").innerHTML = "&#129304;"
        }
        if(results1 == "Wave"){
            document.getElementById("update_emoji").innerHTML = "&#128075;"
        }
    }
}