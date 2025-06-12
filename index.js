// I want to assign an html tag to a JS variable so we can manipulate them from the .js file. 

const display = document.getElementById("display"); 
const historyList = document.getElementById("history-list");
const deleteIcon=document.getElementById("btn-back")

// I'm declaring variables "expression" and "evaluated" as global variables to be used later in our code.
let expression = ""; //the display is to be left blank until anything has been run
let evaluated = false; //since nothing has been evaluated it will be left as false
// Now for every html tag in the body that has a class"btn" we're going to loop over them so each time they are clicked the inline function is run.
document.body.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;
    handleInput(value);
  });
});

// seeing as a normal keyboard doesn't have these special characters like: ←,÷,×, we want to // Replace '*' with '×' and '/' with '÷' to match the calculator's display.
document.body.addEventListener("keydown", (e) => { // This function is used to listen to every keyboard event in the body
  const key = e.key; //create a varaible key to be used rather than retyping "e.key"
  if (!isNaN(key) || "+-*/.".includes(key)) { //this line is used to check if the key presssed is either an integer or these other characters
    handleInput(key === '*' ? '×' : key === '/' ? '÷' : key); //we call our function handleInput if the key is * or /
  } 
  else if (key === 'Enter') { //if the key is "enter" is should do an equal to computation
    handleInput("=");
  } 
  else if (key === 'Backspace') { //if the key is the backspace it should do the delete operation
    e.preventDefault() //this prevents the usual trigger the backspace has 
    handleInput("C");//runs this function instead
  }
});

//The below function define what each operation should.
function handleInput(value) {
  if (value === "=") {
    try {
      const sanitized = expression.replace(/×/g, "*").replace(/÷/g, "/"); //I used /g so every instance of this * and / will be changed not just the first use of it
      const result = eval(sanitized); //eval() is used here so the string is computed as an integer
      addToHistory(expression, result); //to save the result to our history, both the expression and result
      display.value = result;
      expression = result.toString(); //converts the result to a string format
      evaluated = true; //once everything has been satisfied, change evaluated to true.
        } 
    catch { //this is used to display an error incase everything hasn't been satisfied
      display.value = "Error";
      expression = "";
    }
  } 
  else if (value === "C") { //Now if "C" is clicked on...
    if (!evaluated) { //but the numbers in the display hasn't been evaluated 
        expression = expression.slice(0, -1); //then remove one number from the numbers in the display.
        display.value = expression; //now expression has been updated
    }
    if(evaluated){ //but if "C" was clicked on after evaluation then...
        expression="" //clears up everything in the display
        display.value=expression; //expression is updated
    }
  } 
  else {
    if (evaluated) {
      expression = "";
      evaluated = false;
    }
    expression += value;
    display.value = expression;
  }
}
function addToHistory(exp, res) { //this function is used to update the history list
  const li = document.createElement("li"); 
  li.textContent = `${exp} = ${res}`; //this line updates the history line to show both the expression and the result
  historyList.appendChild(li);
}
