import React from 'react';

const Option = (props) => (
  <div className="option">
      <label
        className={props.classToBeApplied}
      >
        <input
          type="radio"
          checked={props.selected}
          disabled={props.applyClasses ? true : false }
          name={props.indexQuestion}
          value={props.question}
          onChange={(e) => {
            props.handleAnswerChecking(e, props.indexQuestion, props.indexOption)}}
        />
        <span>{props.question}</span>
      </label>
  </div>

)

export default Option
