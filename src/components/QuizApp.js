import React from 'react';
import Header from './Header';
import Question from './Question';
import {buildButtonDataArray } from '../utility/utility'
import '../styles/styles.css';

import questionData from '../data/stateQuestions.json';

export default class QuizApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonData: buildButtonDataArray(questionData),
      answered: Array(50).fill(false),
      range: 0,
      score: 0,
      endGame: false

  };
}
handleAnswerChecking = (e, index, optionsIndex) => {

  // Check if answer is correct &
  let copyAnsweredArray = this.state.answered.slice();
  copyAnsweredArray[index] = (this.state.buttonData[index].correctAnswer === e.target.value);
  this.setState(() => ({answered: copyAnsweredArray}));

  // Deal with selecting radio buttons and correct classes
  let copyButtonData = this.state.buttonData.slice();
  let newOptionSelected = [false,false,false];
  newOptionSelected[optionsIndex] = true;
  copyButtonData[index]['selected'] = newOptionSelected;
  this.setState(() => ({buttonData: copyButtonData}));
}

// Navigating the quiz
handleGoForward = () => {
  this.setState((prevState) => ({range: prevState.range + 5}))
}
handleGoBack = () => {
  this.setState((prevState) => ({range: prevState.range - 5}))
}

// Applying correct classes to each options for each question
handleScoring = () => {
  let copyButtonData = this.state.buttonData.slice();
  copyButtonData.forEach((question) => {
    question.options.forEach((option, optionsIndex) => {
      if (question.correctAnswer === option && question.selected[optionsIndex]){
        question.classes[optionsIndex] = 'correctPicked';
      } else if(!(question.correctAnswer === option) && question.selected[optionsIndex]) {
        question.classes[optionsIndex] = 'wrongPicked';
      } else if(question.correctAnswer === option) {
        question.classes[optionsIndex] = 'correct';
      }
    });
  });
  this.setState((prevState) => ({
                                  buttonData: copyButtonData,
                                  score: prevState.answered.filter(x => x).length,
                                  endGame: true
                                }));
}
// Reset variables for new round
handleResetQuiz = () => { this.setState(() => ({
                            score: 0,
                            range: 0,
                            answered: Array(50).fill(false),
                            buttonData: buildButtonDataArray(questionData),
                            endGame: false
                            }));
}

  render() {
    return (
      <div>
        <Header />
        <img src="images/usFlag.svg" alt="american flag" className="usFlag"/>
        <div className="container">
          {
            questionData.map((question, index) => {
              return (
                <Question
                  buttonData={this.state.buttonData[index]}
                  applyClasses={this.state.applyClasses}
                  show={ index >= this.state.range && index < (this.state.range + 5)}
                  index={index}
                  key={index}
                  handleAnswerChecking={this.handleAnswerChecking}
                />
              )
            })
          }
          <div className="bookkeeping">
          <div className="bookkeeping__navigationButtons">
            <button
              disabled={this.state.range < 5}
              onClick={this.handleGoBack}>BACK
              </button>
            <button
              disabled={this.state.range >= 45}
              onClick={this.handleGoForward}>NEXT
            </button>
          </div>
          <div className="bookkeeping__scoreArea">
            {
              (this.state.range === 45 && !this.state.endGame)
              && <button onClick={this.handleScoring}>Score</button>
            }
            {
              (this.state.endGame) &&
              <button onClick={this.handleResetQuiz}>Reset</button>
            }
            {
              (this.state.endGame) &&
              <p className="bookkeeping__score">{`Score: ${Math.floor((this.state.score / 50) * 100)} %  (${this.state.score} / 50)`}</p>
            }
          </div>
          </div>
        </div>
      </div>
    )

  }
}
