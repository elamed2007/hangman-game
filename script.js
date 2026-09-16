let categoryDisplay = document.getElementById("categorie")
let wordDisplay = document.querySelector(".affichage")
let N_attempts = document.getElementById("N_attempts")
let style = document.getElementById("style")
let btn_start = document.getElementById("btn_start")
let info_game = document.getElementById("info_game")
let gameBox = document.getElementById("game")
let hello = document.getElementById("hello")
const Separation_wall = document.querySelector(".Separation_wall")
let word = ""
let wordLength = ""

btn_start.onclick = function(){
   info_game.style.display = "none"
   Separation_wall.style.display = "none"
}



if(localStorage.user == "visited"){
   Separation_wall.style.display = "none"
   info_game.style.display ="none"
   hello.style.display ="none"
}

localStorage.user = ""

if(localStorage.user != "visited"){
   localStorage.user = "visited"
}


 async function getData(){
    let pro = await fetch("words.json")
    let data = await pro.json()
    
    // choose a random category index from words.json
    let categoryIndex = Math.ceil(Math.random()*9)
    // choose a random word index from words.json
    let wordIndex = Math.ceil(Math.random()*9)
    // choose the category using categoryIndex
    let categories = data.categories[categoryIndex].nom
    // choose the word using wordIndex and categoryIndex without spaces and uppercased
    word = data.categories[categoryIndex].sub[wordIndex].toUpperCase().replace(/ /g,'')

    create(word,categories)
}


 
// function to create boxes where we will put the letters of the word that the player has to find and the randomly selected category
function create(word,categories){

    // display the category on the page
    categoryDisplay.innerHTML =`Category: ${categories}`
   // word length without spaces
   wordLength = word.length

   // create the word display boxes
   for(i=0;i < wordLength ;i++){
     wordDisplay.innerHTML += `
         <div class="box" id="box${i}"></div>
     `
   }
   

  }

   getData()

count = 0
// the function to check if a letter is present in the word
function checkLetter(letter){

// if the letter is present in the word
   if(word.includes(letter)){
      // find the index of the letter in the word
      letterIndex = word.indexOf(letter) 
      let box = document.getElementById(`box${letterIndex}`)
      // show the letter in the box based on letterIndex
      box.innerHTML = `${letter}`
      box.style.backgroundColor = 'green';
      // replace the letter with a space so each letter is only used once
      word = word.replace(letter," ")
      let box_end = document.getElementById("box_end")
      let emoji = document.getElementById("emoji")
      let message_courage = document.getElementById("message_courage")
      
      if(word == " "*wordLength){
         box_end.style.display = "flex"
         emoji.innerHTML = "&#128512;"
         message_courage.innerHTML = "Congratulations! You won, well done! &#127881;"
      }
   // the letter is not present in the word
   }else{
      count += 1
      N_attempts.innerHTML = `incorrect guesses: ${count}/7`
      style.innerHTML += `button[value = "${letter}"]{ background: #D2042D;color:#000}
                          button[value = "${letter}"]:hover{background-color: #D2042D;}`
      displayHangman(count)
         
      if(count >= 7){
         count = count
         box_end.style.display = "flex"
         emoji.innerHTML = "&#128512;"
         message_courage.innerHTML = "Good try! Don't give up, you'll win next time. Better luck next round! &#x2764;"
      }

      
     
   }  
   
   
}

// display a portion of the hangman image each time the player makes a mistake until the image is completed
function displayHangman(count){
   
   switch(count){
      case count:
      let status = document.getElementById("Hangman")
      status.innerHTML = `<img id="img_hangman" src="hangman photos/status${count}.png" alt="no-image">`;
   }
    
}

let btn_replay = document.getElementById("btn_replay")
let btn_exit = document.getElementById("btn_exit")


btn_replay.onclick = function(){
    location.reload()
    
}

btn_exit.onclick = function(){
   window.close()
}


   

   
   

