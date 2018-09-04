// Function that creates a shuffled version of consumed array
const shuffle = (arrayToShuffle) => {
	let copyArrayToShuffle = arrayToShuffle.slice();
	var i = copyArrayToShuffle.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = copyArrayToShuffle[--i];
		copyArrayToShuffle[i] = copyArrayToShuffle[j];
		copyArrayToShuffle[j] = t;
	}
	return copyArrayToShuffle.slice();
}

// Function - builds an object with needed data for each question
const buildButtonDataArray = (questionData) => {
	let buttonData = [];
	let copyQuestionData = shuffle(questionData);
	copyQuestionData.forEach((question, index) => {
			buttonData.push({
				state: question.state,
				classes: [],
				selected:[false,false,false],
				correctAnswer: question.options[0].slice(),
				options: []
			});
				buttonData[index]['options'] = shuffle(question.options).slice();
				buttonData[index].options.forEach((option, optionsIndex) => {
					if(option === buttonData[index].correctAnswer) {
						buttonData[index]['classes'].push('correct')
					} else {
						buttonData[index]['classes'].push('wrong')
					}
				});

	});
	return buttonData;
}


export {buildButtonDataArray}
