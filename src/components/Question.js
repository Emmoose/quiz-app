import React from 'react';
import Option from './Option';


export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.show) {
      return (
        <div>
          <div className="stateTitle">
            <h3 className="stateTitle__text">{this.props.index + 1  + " : " + this.props.buttonData.state}</h3>
          </div>
          <div className="options">
            <form>
            {
              this.props.buttonData.options.map((option, index) => (
            <Option

              key={index}
              buttonData={this.props.buttonData}
              selected = {this.props.buttonData['selected'][index]}
              indexOption = {index}
              classToBeApplied={this.props.buttonData['classes'][index]}
              indexQuestion={this.props.index}
              question={this.props.buttonData.options[index]}
              handleAnswerChecking={this.props.handleAnswerChecking}
              handleRadioButtonClick={this.props.handleRadioButtonClick}
            />
            ))}
            </form>
          </div>
        </div>
      )}
    else {return null;}
  }
}



//This component decides if question component should be rendered or not
// import React from 'react';
// import Question from './Question';
//
// const QuestionSelector = (props) => {
//
//     return (
//       <Question
//         show={props.show}
//         applyClasses={props.applyClasses}
//         buttonData={props.buttonData}
//         index={props.index}
//         question={props.question}
//         handleAnswerChecking={props.handleAnswerChecking}
//       />
//     )
// }
// export default QuestionSelector;
