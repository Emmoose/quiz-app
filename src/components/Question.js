import React from 'react';
import Option from './Option';

const Question = (props) =>  (
          <div>
            <div className="stateTitle">
              <h3 className="stateTitle__text">{props.index + 1  + " : " + props.buttonData.state}</h3>
            </div>
            <div className="options">
              <form>
              {
                props.buttonData.options.map((option, index) => (
              <Option
                key={index}
                applyClasses={props.applyClasses}
                buttonData={props.buttonData}
                selected = {props.buttonData['selected'][index]}
                indexOption = {index}
                classToBeApplied={props.buttonData['classes'][index]}
                indexQuestion={props.index}
                question={props.buttonData.options[index]}
                handleAnswerChecking={props.handleAnswerChecking}
                handleRadioButtonClick={props.handleRadioButtonClick}
              />
              ))
            }
              </form>
            </div>
          </div>
        )

export default Question;
