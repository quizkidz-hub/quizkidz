import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';

export default function App() {
	const CardStyle = {
		margin: "20px",
		width: "500px",
		height: "800px",
		"text-align": "center",
		"justify-content" : "space-between"
	}

	const ExplanationStyle = {
		margin: "0px",
		width: "400px",
		height: "700px",
		"text-align": "left",
		"justify-content" : "space-between"
	}
	  
	class Question {
		constructor() {
			this.questionText = '';
			this.answerOptions = [{answerText:'', isCorrect: false}];
			this.explanation = '';
		}
	}
	const [questions, setQuestions] = useState([new Question()]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentFlipQuestion, setCurrentFlipQuestion] = useState(0);
	const [lastQuestion, setlastQuestion] = useState(false);
	const [showScore, setShowScore] = useState(false);
	const [showFrontpage, setShowFrontpage] = useState(true);
	const [score, setScore] = useState(0);
	const [showCorrect, setShowCorrect] = useState(false);
	const [showInCorrect, setShowInCorrect] = useState(false);
	const [showCategories, setShowCategories] = useState(false);
	const [category, setCategory] = useState(null);
	const [isFlipped, setIsFlipped] = useState(false);

	const getData=(category)=>{
		fetch(category+'.json'
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
	//   useEffect(()=>{
	// 	getData()
	//   },[])


	const handleAnswerButtonClick = (e, isCorrect) => {

		e.preventDefault();
		setShowCorrect(false);
		setShowInCorrect(false);

		if (isCorrect === true) {
			setScore(score+1)
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setlastQuestion(true);
		}	

		setCurrentFlipQuestion(currentQuestion);
		if (isCorrect === true) {
			setShowCorrect(true);
			setIsFlipped((prev) => !prev)
		} else {
			setShowInCorrect(true);
			setIsFlipped((prev) => !prev)
		}
	}

	const handleNextButtonClick = (e) => {
		if (lastQuestion === true) {
			setShowScore(true);
		}
		setIsFlipped((prev) => !prev);
		setlastQuestion(false)
	}

	const handlePlayButtonClick = (e) => {
		setShowFrontpage(false);
		setShowCategories(true);
	}



	const handleCategories = (e, category) => {
		setCategory(category);
		getData(category);
		setShowCategories(false);
	}

	function renderQuiz() {
		return(
			<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div
				style={CardStyle}
				className="CardFront"
			  >		
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
			</div>
			<div
				style={CardStyle}
				
				className="CardBack"
			>	
				{showCorrect ? 
					<div>
						<div className='success-message'> Correct </div>
						<div style={ExplanationStyle}> 
							{questions[currentFlipQuestion].explanation} 
							<img src={questions[currentFlipQuestion].image}  width="80%"></img>
						</div>
						<button onClick={(e) => handleNextButtonClick(e)}> Next </button>
					</div> : null}
				{showInCorrect ? 
					<div>
						<div className='failure-message'>Incorrect</div>
						<div style={ExplanationStyle}> 
							{questions[currentFlipQuestion].explanation} 
							<img src={questions[currentFlipQuestion].image}  width="80%"></img>
						</div>
						<button onClick={(e) => handleNextButtonClick(e)}> Next </button>
					</div> : null}
			</div>

			</ReactCardFlip>
		);
	}

	function renderScore() {
		return(
			<div style={CardStyle} className='score-section'>You scored <br></br> {score} out of {questions.length} </div>
		);
	}

	function renderFrontPage() {
		return (
			<div style={CardStyle} className='front-page'>
				<img src="logo.png" width="80%"></img>
				<button>Login with Google</button>
				<button>Login with Facebook</button>
				<button onClick={(e) => handlePlayButtonClick(e)}> Play</button>	
			</div>
		);
	}

	function renderCategories() {
		return (
				<div style={CardStyle} className='front-page'>
					<button onClick={(e) => handleCategories(e, "Geography")}>Geography</button>
					<button onClick={(e) => handleCategories(e, "Science")}>Science</button>
					<button onClick={(e) => handleCategories(e, "Sports")}>Sports</button>
				</div>
		);
	}

	function renderFrontPageOrQuiz() {
		return (
			<div>
				{showFrontpage ? renderFrontPage() 
				: <div> {showCategories ? renderCategories() : renderQuiz()} </div>}
			</div>
		);
	}

	return (
		<div className='app'>
			{showScore ? renderScore() : renderFrontPageOrQuiz() }
		</div>
	);
}
