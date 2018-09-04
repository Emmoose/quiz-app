import React from 'react';
import ReactDOM from 'react-dom';
import QuizApp from './components/QuizApp'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<QuizApp />, document.getElementById('root'));
registerServiceWorker();
