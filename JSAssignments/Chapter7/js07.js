"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Chapter case   

      Word Cloud   Generator
      Author: 
      Date:       

      Filename:       js07.js
 */

//Add an onchange event to the getFile input field
document.getElementById("getFile").onchange = function() {
      //retrieve information about the selected file
      let userFile = this.files[0];

      try
      {
            let isText = userFile.type.startsWith("text");
            if (!isText)
            {
                  throw userFile.name + " is not a valid text file.";
            }
      
            //Read the contents of the selected file
            let fr = new FileReader();
            fr.readAsText(userFile);

            //Once the file has finished loading, display in the page
            let sourceDoc = document.getElementById("wc_document");
            fr.onload = function(){
                  sourceDoc.innerHTML = fr.result;
                  
                  //store the text only of the document and remove HTML tags
                  let sourceText = sourceDoc.textContent;
                  
                  //Generate the word cloud
                  wordCloud(sourceText);
            }            
      }
      catch(err)
      {
            window.alert(err);
      }

      function wordCloud(sourceText)
      {
            //Convert the course text to lowercase
            sourceText = sourceText.toLowerCase();

            //Remove leading and trailing whitespaces
            sourceText = sourceText.trim();

            //Leave only alphabet characters and whitespaces in the text
            let alphaRegx = /[^a-zA-z\s]/g;
            sourceText = sourceText.replace(alphaRegx, "");

            //Remove stop words from the text
            for(let i = 0; i < stopWords.length; i++)
            {
                  let stopRegx = new RegExp("\\b" + stopWords[i] + "\\b", "g");
                  sourceText = sourceText.replace(stopRegx, "");
            }

            //Place the remaining words in an array
            let words = sourceText.split(/\s+/g);

            //04/04/2023
            //Sort the words in alphabetical order
            words.sort();

            //Create an 2D array in which each item is array
            //containing a word and its duplicate count
            let unique = [ [words[0], 1] ];

            //Keep track of the index of unique words
            let idx = 0;

            //Create a for loop to iterate through each 
            //item in the words array
            for (let i = 1; i < words.length; i++)
            {
                  //if the current word is equal to the previous word
                  if(words[i] === words[i-1])
                  {
                        //increase the duplicate count by 1
                        unique[idx][1]++;
                  }
                  else
                  {
                        //the current words is not the same as the previous
                        //word; so, we will add the new word to the 
                        //unique array
                        idx++;
                        unique[idx] = [words[i], 1];
                  }
            } 
            
            //Sort the unique array by descending order of duplicate count
            unique.sort(byDuplicate);
            function byDuplicate(a, b)
            {
                  return b[1] - a[1];
            }
            
            //Keep the top 100 words
            unique = unique.slice(0, 100);

            //Find the most repeated word
            let maxCount = unique[0][1];
            //Sort the word list in alphabetical order
            unique.sort();

            //Get a reference to the word cloud box
            let cloudBox = document.getElementById("wc_cloud");
            cloudBox.innerHTML = "";

            //--------------Creating the word cloud-------------------
            //Change the size of the word based on its frequency
            //we need a for loop to add each word to the cloudBox
            for(let i = 0; i < unique.length; i++)
            {
                  //create a span element
                  let word = document.createElement("span");
                  //set the text content of the span element to each word
                  word.textContent = unique[i][0];
                  //set the font size relative to the maxCount
                  word.style.fontSize = unique[i][1]/maxCount +"em";
                  //append the span element to the cloudBox
                  cloudBox.appendChild(word);
            }
      }
};

// let str = "Client-Side Programming";
// let spaceIdx = str.indexOf(" "); //11
// console.log(str);
// console.log("index of space = " + spaceIdx);
// console.log("print Programming = " + str.substring(spaceIdx+1)); //Programming
// console.log("print Program = " + str.substring(spaceIdx+1, 19)); //Program
// console.log("print -: " + str.charAt(str.indexOf("-")))



















/*--- ----------------------------------------------*/
/* Array of words to NOT include in the word cloud */
/*-------------------------------------------------*/

let stopWords = ["a", "about", "above", "across", "after", "afterwards", "again", "against", 
                 "ago", "all", "almost", "alone", "along", "already", "also", "although", 
                 "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", 
                 "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", 
                 "are", "around", "as", "at", "back", "be", "became", "because", "become", 
                 "becomes", "becoming", "been", "before", "beforehand", "behind", "being", 
                 "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", 
                 "but", "by", "call", "came", "can", "cannot", "cant", "case","cases","cause", 
                 "co", "computer", "con", "could", "couldnt", "cry", "de", "describe", "detail", 
                 "do", "does", "doing", "done", "down", "due", "during", "each", "eg", "eight", 
                 "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", 
                 "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fie",
                 "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", 
                 "formerly", "forty", "found", "four", "from", "front", "full", "further", 
                 "get", "give", "go", "had", "has", "hasnt", "have", "he", "held", "having", 
                 "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", 
                 "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", 
                 "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", 
                 "keep", "know", "knows", "knew", "last", "latter", "latterly", "least", "less", 
                 "let", "ltd", "made", "make","many", "may", "me", "meanwhile", "might", "mill", 
                 "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", 
                 "myself", "name", "namely", "neither", "never", "nevertheless", "next", 
                 "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", 
                 "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", 
                 "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", 
                 "own", "part", "per", "perhaps", "plainly", "please", "precisely", "put", 
                 "rather", "re", "same", "said", "say", "says", "see", "seem", "seemed", 
                 "seeming", "seems", "serious", "several", "shall", "she", "should", "show", 
                 "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", 
                 "something", "sometime", "sometimes", "somewhere", "st", "sts", "still", "such", 
                 "system", "take", "ten", "th", "ths", "thx", "than", "that", "the", "their", 
                 "them", "themselves", "then", "thence", "there", "thereafter", "thereby", 
                 "therefore", "therein", "thereupon", "these", "they", "thick", "thin", 
                 "third", "this", "those", "though", "three", "through", "throughout", 
                 "thru", "thus", "to", "together", "too", "top", "toward", "towards", 
                 "twelve", "twenty", "two", "un", "unless", "under", "until", "up", 
                 "upon", "us", "very", "via", "was", "we", "well", "were", "weve", "what", 
                 "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", 
                 "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", 
                 "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", 
                 "with", "within", "without", "would", "year", "years", "yet", "you", 
                 "your", "yours", "yourself", "yourselves"];
                 