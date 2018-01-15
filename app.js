Vue.use(VueMaterial.default);
var quiz = {
  title: 'Diagnostik und Assessment: Richtig oder Falsch?',
  hinweis: 'Eine Aussage ist nur dann richtig wenn auch jede ihrer Teilaussagen richtig ist.',
  questions: [
    {
      text: "Fortbildung ist Pflicht.",
      erk: "Ja die Fortbildung ist Pflicht und das ist die Erklärung.",
      responses: [
        {text: 'Richtig', correct: true},
        {text: 'Falsch'},

      ]
    },

    {
      text: "Der Rorschachtest ist ein sogenanntes Form-Deuteverfahren.",
      erk: "Der Roschachtest ist ein Form-Deuteverfahren",
      responses: [
        {text: 'Richtig', correct:true},
        {text: 'Falsch'},

      ]
    },

    {
      text: "Intelligenz ist die zusammengesetzte oder globale Fähigkeit des Individuums, zweckvoll zu handel, vernünftig zu denken und sich mit seiner Umwelt wirkungsvoll auseinander zu setzen. Es handelt sich um das Intelligenzkonzept von Catell(1956)",
      erk: "Es ist das Intelligenzkonzept von Wechsler (1956)",
      responses: [
        {text: 'Richtig'},
        {text: 'Falsch', correct: true},

      ]
    },

    {
      text: "Beim Wechsler Intelligence Scale for Children-Fourth Edition setzt sich der Gesamt-IQ zusammen aus: Der Verarbeitungsgeschwindigkeit, Sprachverstädnis, Arbeitsgedächtnis und Wahrnehmungsgebundenem-Logischen Denken.",
      erk: "Der WISC-IV setzt sich aus VG, AGD, WLD und SV zusammen.",
      responses: [
        {text: 'Richtig', correct:true},
        {text: 'Falsch'},

      ]
    },
  ]
};

new Vue({
  el: '#app1',
  data: {
  quiz: quiz,
  questionIndex: 0,
  userResponses: Array(quiz.questions.length).fill(false),
  ok: false,
  win: null,
  feedback: "Das ist Korrekt!",
  amount: 0,
  absolviert: 0

},
methods: {
    next: function(){
      this.absolviert += 1;
      this.questionIndex++;
      this.ok = false;
      this.win = null;
      this.amount = this.calProg() ;

    },
    prev: function(){
      this.questionIndex--;
      this.ok= true;
    },

    check: function(){

      console.log('check function invoked');
      console.log(this.userResponses[this.questionIndex]);
      if (this.userResponses[this.questionIndex] === true) {
        console.log();('Das ist richtig :)')
        this.win = true;
      } else {
        console.log();('Das ist leider falsch :(');
        this.feedback = "Das ist leider falsch!"
        this.win = false;
      }
      this.ok = true;
    },

    calProg: function(){
      return (this.absolviert / this.quiz.questions.length) *100;
    },

    score: function() {
    return this.userResponses.filter(function(val) { return val }).length;
    }
},

})
