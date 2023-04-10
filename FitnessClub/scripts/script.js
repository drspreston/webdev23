/*
    Student name: Silvia Preston
    File name: script.js
    Date: 04/10/2023
*/

//Global variables
var video = document.getElementById("example");
var videoSource = document.getElementById("vid-src");
var descrSource = document.getElementById("despsrc");

//Hamburger menu function
function hamburger(){
    var menu = document.getElementById("menu-links");
    var logo = document.getElementById("ffc-logo");
    //if the display style of the menu is block AND 
    //the logo display style is none
    if (menu.style.display === "block" && logo.style.display === "none")
    {
        //if both statements are true
        menu.style.display = "none";
        logo.style.display = "block";
    }
    else{
        //if one of the statements or both is false
        menu.style.display = "block";
        logo.style.display = "none";
    }
}

//Function to display the burpees example video
function burpees(){
    videoSource.src = "media/burpees.mp4";
    descrSource.src = "media/burpees-descriptions.vtt";
    video.style.display = "block";
    video.load();
}

//Function to display the plank example video
function plank(){
    videoSource.src = "media/plank.mp4";
    descrSource.src = "media/plank-descriptions.vtt";
    video.style.display = "block";
    video.load();
}

//Function to display the mountain climbers example video
function mountain(){
    videoSource.src = "media/mc.mp4";
    descrSource.src = "media/mountain-descriptions.vtt";
    video.style.display = "block";
    video.load();
}

//Function to display a promo code
function discount(){
    var promo = document.getElementById("special");
    promo.firstChild.nodeValue = "Promo Code: D25START";
    promo.style.color = "#ff0000";
    promo.style.fontSize = "2em";
}