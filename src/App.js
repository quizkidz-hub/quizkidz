import React, { useState, useEffect } from 'react';

export default function App() {
	class Question {
		constructor() {
			this.questionText = '';
			this.answerOptions = [{answerText:'', isCorrect: false}]
		}
	}
	const [questions, setQuestions] = useState([new Question()]);
	const getData=()=>{
		fetch('data_3_5.json'
		,{
		  headers : { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		   }
		}
		)
		  .then(function(response){
			console.log(response)
			return response.json();
		  })
		  .then(data => {
			  setQuestions(data)
		  });
	  }
	  useEffect(()=>{
		getData()
	  },[])

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [showCorrect, setShowCorrect] = useState(false);
	const [showInCorrect, setShowInCorrect] = useState(false);

	const handleAnswerButtonClick = (e, isCorrect) => {

		e.preventDefault();
		setShowCorrect(false);
		setShowInCorrect(false);

		setTimeout(() => {
			setShowCorrect(false);
			setShowInCorrect(false);
			
			if (isCorrect === true) {
				setScore(score+1)
			}
	
			const nextQuestion = currentQuestion + 1;
			if (nextQuestion < questions.length) {
				setCurrentQuestion(nextQuestion);
			} else {
				setShowScore(true);
			}		
		}, 2000);

		if (isCorrect === true) {
			setShowCorrect(true);
		} else {
			setShowInCorrect(true);
		}
	}

	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>You scored {score} out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion+1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{
							questions[currentQuestion].answerOptions.map((answerOption) => 
							(<button onClick={(e) => handleAnswerButtonClick(e, answerOption.isCorrect)}>{answerOption.answerText}</button>))
						}
					</div>
					{showCorrect ? <div class="success-message">Correct</div>: null}
					{showInCorrect ? <div class="failure-message">Incorrect</div>: null}
				</>
			)}
		</div>
	);
}
