const url = 'https://mo1060.github.io/quizAPI.json';

fetch(url)
.then(res => res.json())
.then(quiz => {
  view.start.addEventListener('click tap', ()=> game.start(quiz.questions), false);
  view.response.addEventListener('click tap', (event) => game.check(event), false);
  view.weiter.addEventListener('click tap',(event)=> game.ask(), false);
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
progress: document.querySelector('#fortschritt'),
question: document.querySelector('#question'),
result: document.querySelector('#result'),
explain: document.querySelector('#explain'),
info: document.querySelector('#info'),
start: document.querySelector('#start'),
response: document.querySelector('#response'),
timer: document.querySelector('#timer strong'),
weiter: document.querySelector('#next'),

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
	this.show(this.progress);
  	this.show(this.result);
	this.show(this.weiter);
	
  	this.hide(this.start);
  	this.render(this.score,game.score);
	 this.render(this.progress, '');
  	this.render(this.result,'');
  	this.render(this.info,'');
	this.render(this.explain, '');

 
  },
  teardown(){
    this.hide(this.question);
    this.hide(this.response);
	this.hide(this.weiter);
    this.show(this.start);
  },
  
   buttons(array){
  return array.map(value => `<button id= 'butter' class="ansButton btn btn-primary btn-lg">${value}</button>`).join('');
},

weiterButton(){
   return `<button id='butweit' class="btn btn-primary btn-lg" disabled>Weiter</button>` ;
 },

  

 progressBar(perc, percF){
    
   return `
<div class="progress">
<div id='proSuc' class="progress-bar bg-success " role="progressbar" style="width: ${perc}%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
<div class="progress-bar bg-danger" role="progressbar" style="width: ${percF}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>`;
 },

};

const game = {
	start(quiz){
    console.log('start() invoked');
  this.score = 0;
  this.perc = 0;
  this.percF = 0;
  this.questions = [...quiz];
  this.elemA = this.questions.length; 
  
  view.setup();
  
  this.secondsRemaining = 2400;
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
	
    if(this.questions.length > 0){
		
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [this.question.altB, this.question.altA, this.question.antwort];
      shuffle(options);
      const question = `${this.question.frage}`;
      view.render(view.question,question);
	  view.render(view.result, '');
	  view.render(view.explain, '');
      view.render(view.response,view.buttons(options));
	  view.render(view.weiter,view.weiterButton());
    } 
    else{
      this.gameOver()
    }
  },

  check(event){
  console.log('check(event) invoked');
  const response = event.target.textContent;
    const expl = this.question.erklaer;
  const answer = this.question.antwort;
  if(response === answer){
      view.render(view.result,'Richtig!', {'class':'correct'});
	  view.render(view.explain,`${answer} Ist richtig. \n ${expl}`);
	  $(event.target).removeClass("btn-primary").addClass("btn-success");
	      this.perc+= 100 / this.elemA ;
      $(".progress-bar").css("width", this.perc + "%");
      this.score++;
      view.render(view.score,this.score);
    } else {
	  $(event.target).removeClass("btn-primary").addClass("btn-danger");
	$('#response').removeClass("btn-danger");
	$( "#response" ).prop( "disabled", true );
	
      view.render(view.result,`Leider falsch! Die korrekte Antwort lautet ${answer}`,{'class':'wrong'});
	  view.render(view.explain,`Das ist falsch, die richtige Antwort lautet ${answer}. \n ${expl}`);
      this.percF+= 100 / this.elemA ;
    }
	
      view.render(view.progress,view.progressBar(this.perc, this.percF));
	  let buttonArr = document.querySelectorAll('button');
 
      for(let i = 0; i < 4; i++){
        console.log(buttonArr[i]);
        buttonArr[i].disabled=true;
      } 
      $('#butweit').prop('disabled', false);
   
      
    
       
    
    //this.ask();
  },

  gameOver(){
    console.log('gameOver() invoked');
if(this.perc >= 60 && this.perc < 70){
       view.render(view.info,`Game Over, du hast ${this.score} Punkt${this.score !== 1 ? 'e' : ''}. Eine ausreichende Leistung :-/ Du bekommst eine 4. `);
     } 
	 else if(this.perc >= 70 && this.perc < 80){view.render(view.info,`Game Over, du hast ${this.score} Punkt${this.score !== 1 ? 'e' : ''}. Eine befriedigende Leistung :-| Du bekommst eine 3. `);}
	 else if(this.perc >= 80 && this.perc < 90){view.render(view.info,`Game Over, du hast ${this.score} Punkt${this.score !== 1 ? 'e' : ''}. Eine gute Leistung :-) Du bekommst eine 2. `);}
	 else if(this.perc >= 90 && this.perc <= 100){view.render(view.info,`Game Over, du hast ${this.score} Punkt${this.score !== 1 ? 'e' : ''}. Oh yeah baby 8-)). Sehr Gut! Du bekommst eine 1. `);}
	 else {
	 view.render(view.info,`Game Over, du hast ${this.score} Punkt${this.score !== 1 ? 'e' : ''}...das war nicht gut :-(...lern, sonst fällst du durch. Du bekommst eine 5.`);}
    
    view.teardown();
    clearInterval(this.timer);
  },


};



