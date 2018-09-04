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
      applyClasses: false,
      range: 0,
      score: 0
  };
}
handleAnswerChecking = (e, index, optionsIndex) => {

  // Deals with checking if answer is correct
  let copyAnsweredArray = this.state.answered.slice();
  copyAnsweredArray[index] = (this.state.buttonData[index].correctAnswer === e.target.value);
  this.setState(() => ({answered: copyAnsweredArray}));

  // Deal with selecting radio buttons and correct classes
  let copyButtonData = this.state.buttonData.slice();
  let newOptionSelected = [false,false,false];
  newOptionSelected[optionsIndex] = true;
  copyButtonData[index]['selected'] = newOptionSelected;

  //THIS IS SUCH UGLY CODE IM FAINTING SO PLEASE CHANGEI NT
    copyButtonData[index]['classes'].forEach((classNum, classIndex) => {
      if(copyButtonData[index]['classes'][classIndex].includes('wrong')) {
        copyButtonData[index]['classes'][classIndex] = 'wrong';
      }

      if(copyButtonData[index]['classes'][classIndex].includes('correct')) {
        copyButtonData[index]['classes'][classIndex] = 'correct';
      }
  });

  if(!copyButtonData[index]['classes'][optionsIndex].includes('Picked')){
    copyButtonData[index]['classes'][optionsIndex] += 'Picked'
  }
  this.setState(() => ({buttonData: copyButtonData}));
}
handleGoForward = () => {
  this.setState((prevState) => ({range: prevState.range + 5}))
}
handleGoBack = () => {
  this.setState((prevState) => ({range: prevState.range - 5}))
}
handleScoring = () => {
  this.setState((prevState) => ({

                        score: prevState.answered.filter(x => x).length,
                        applyClasses: true,
                      }));
}
handleResetQuiz = () => {
  this.setState(() => ({
                        score: 0,
                        range: 0,
                        answered: Array(50).fill(false),
                        applyClasses: false,
                        buttonData: buildButtonDataArray(questionData),

  }))
}

componentWillMount() {

}
  render() {
    return (
      <div>
        <Header />
        <img src="images/usFlag.svg" className="usFlag"/>
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
              (this.state.range === 45 && !this.state.applyClasses)
              && <button onClick={this.handleScoring}>Score</button>
            }
            {
              (this.state.applyClasses) &&
              <button onClick={this.handleResetQuiz}>Reset</button>
            }
            {
              (this.state.applyClasses) &&
              <p className="bookkeeping__score">{`Score: ${Math.floor((this.state.score / 50) * 100)} %  (${this.state.score} / 50)`}</p>
            }
          </div>
          </div>
        </div>
      </div>
    )

  }
}
