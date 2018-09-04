//This component decides if question component should be rendered or not
import React from 'react';
import Question from './Question';

const QuestionSelector = (props) => {
  if (props.show) {
    return (
      <Question
        applyClasses={props.applyClasses}
        buttonData={props.buttonData}
        index={props.index}
        question={props.question}
        handleAnswerChecking={props.handleAnswerChecking}
      />
    )
  }
  return ''
}
export default QuestionSelector;
