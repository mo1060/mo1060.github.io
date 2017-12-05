const url = 'https://mo1060.github.io/quizAPI.json';

fetch(url)
.then(res => res.json())
.then(quiz => {
  view.start.addEventListener('click', ()=> game.start(quiz.questions), false);
  view.response.addEventListener('click', (event) => game.check(event), false);
});
    // Utility functions
function random(a,b=1) {
// if only 1 argument is provided, we need to swap the values of a and b
  if (b === 1) {
	  [a,b] = [b,a];
  }
  return Math.floor((b-a+1) * Math.random()) + a;
}

function shuffle(array) {
  for (let i = array.length; i; i--) {
      let j = random(i)-1;
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
}


// View Object
const view = {
score: document.querySelector('#score strong'),
question: document.querySelector('#question'),
result: document.querySelector('#result'),
info: document.querySelector('#info'),
start: document.querySelector('#start'),
response: document.querySelector('#response'),
timer: document.querySelector('#timer strong'),
render(target,content,attributes) {
    for(const key in attributes) {
        target.setAttribute(key, attributes[key]);
  }
  target.innerHTML = content;
 },
show(element){
  element.style.display = 'block';
},
hide(element){
  element.style.display = 'none';
},

  setup(){
  	this.show(this.question);
  	this.show(this.response);
  	this.show(this.result);
  	this.hide(this.start);
  	this.render(this.score,game.score);
  	this.render(this.result,'');
  	this.render(this.info,'');
    
 
  },
  teardown(){
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  },
  
   buttons(array){
  return array.map(value => `<button>${value}</button>`).join('');
}
  



};

const game = {
	start(quiz){
    console.log('start() invoked');
  this.score = 0;
  this.questions = [...quiz];
  view.setup();
  this.secondsRemaining = 20;
  this.timer = setInterval(this.countdown, 1000);
  this.ask();
  },
  

  
countdown() {
game.secondsRemaining--;
view.render(view.timer,game.secondsRemaining);
if(game.secondsRemaining < 0) {
game.gameOver();
}
},
  
  ask(frage){
    console.log('ask() invoked');
    if(this.questions.length > 2){
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [this.question.altB, this.question.altA, this.question.antwort];
      shuffle(options);
      const question = `${this.question.frage}`;
      view.render(view.question,question);
      view.render(view.response,view.buttons(options));
    } 
    else{
      this.gameOver()
    }
  },

  check(event){
  console.log('check(event) invoked');
  const response = event.target.textContent;
  const answer = this.question.antwort;
  const erkl = this.question.erklaer;
  if(response === answer){
      view.render(view.result,`Das ist richtig. ${erkl} `, {'class':'correct'});
      this.score++;
      view.render(view.score,this.score);
    } else {
      view.render(view.result,`Leider falsch! Die korrekte Antwort lautet ${answer}`,{'class':'wrong'});
    }
    this.ask();
  },

  gameOver(){
    console.log('gameOver() invoked');
    view.render(view.info,`Game Over, du hast ${this.score} Punkt${this.score !== 1 ? 'e' : ''}`);
    view.teardown();
    clearInterval(this.timer);
  },
      

};




