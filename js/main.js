
//Quiz Title and Questions
const title="Binary Numbers Quiz";

const questions = [
  {
    question:"What is 0110 as a denary / decimal number?",
    type:"Multiple Choice",
    options:["12","3","4","6"],
    correctOption:3
  },
  {
    question:"What is 1100 as a denary / decimal number?",
    type:"Multiple Choice",
    options:["12","3","4","6"],
    correctOption:0
  },
  {
    question:"What is 0100 as a denary / decimal number?",
    type:"Multiple Choice",
    options:["12","3","4","6"],
    correctOption:2
  }
];

//Functions that make HTML
const makeMultipleChoiceQuestion = (question, questionNumber) => {
  let $thisQuestion = $(`<fieldset></fieldset>`);
  $thisQuestion.append(`<label><span class="number">${questionNumber+1}</span>
                        ${question.question}</label>`);
  for(let optionNumber = 0; optionNumber < question.options.length; optionNumber+=1){
    $thisQuestion.append(
      `<input type="radio" id="mcq${questionNumber}${optionNumber}" value="${optionNumber}" name="${questionNumber}">
        <label for="question${questionNumber}.${optionNumber}" class="light">${question.options[optionNumber]}</label>
        `
    );
  }
  return($thisQuestion);
};





$('title').text(title);
$('body').prepend(`<h1>${title}</h1>`);


$questions = $('#questions');
for (let i = 0; i < questions.length; i += 1){
  let $thisQuestion = `<p>No question set</p>`;
  if (questions[i].type === "Multiple Choice"){
    $thisQuestion = makeMultipleChoiceQuestion(questions[i], i)
  }
  $questions.append($thisQuestion)
}

$questions.append(`<button id="check">Check answers</button>`);
console.log("hi");

//Event Handlers
$('button#check').on('click', function(e){
  e.preventDefault();
  //get all the selected radio buttons
  //const $selectedRadioButtons = $('input#q01:radio[name="1"]:checked')
  let correctAnswers = 0;
  for(let i = 0; i < questions.length; i+=1){
    if(questions[i].type==="Multiple Choice"){
      const $selectedRadioButton = $(`input:radio[id^="mcq${i}"]:checked`);
      if ($selectedRadioButton.length === 0){
        $('fieldset').eq(i).children().first().addClass('no-answer');
      } else if (parseInt($selectedRadioButton.attr("value")) === questions[i].correctOption){
        $selectedRadioButton.next().addClass('correct');
        correctAnswers += 1
      } else{
        $selectedRadioButton.next().addClass('incorrect')
      }
    }
  }
  let $feedback = $("#feedback");

  $feedback.hide();
  $feedback.append(`<p>You correctly answered ${correctAnswers} of ${questions.length} questions</p>`);
  $questions.append($feedback);
  $feedback.fadeIn(1000);
  let $tryAgainButton = $(`<button id='try-again'>Try Again?</button>`).hide();
  $questions.append($tryAgainButton);
  $tryAgainButton.fadeIn(2000);


});


