import React, { useState, useEffect } from 'react'
import shuffleArray from './functions/shuffleArray'
import Button from './components/Button'
import {nanoid} from "nanoid"
import './index.css'

export default function App() {
  const [color, setColor] = useState({box: randomHexCode(), choices: []});
  const [response, setResponse] = useState({show: false, correct: false, answer: '', score: 0, count: 0});
  

  useEffect(() => {
    generateChoices();
  }, [color.box]);

// Shuffles choices and saves it to state
  function generateChoices() {
    let choiceData = shuffleArray([color.box, randomHexCode(), randomHexCode()]);
    setColor(prevColor => ({...prevColor, choices: choiceData}));
  };

// Creates and Returns a random hex code
  function randomHexCode(){
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    let hexCode = '#';
    while( hexCode.length < 7 ){
      hexCode += digits[Math.floor(Math.random() * 16)]
    }
    return hexCode;
  };

// Checks Answer and changes affected States
  function checkAnswer(event) {
    if (event.target.innerText === color.box){
      setResponse(prevResponse => (
        {...prevResponse,
          show: true,
          correct: true, 
          count: prevResponse.count + 1,
          score: prevResponse.score + 1,
          answer: event.target.innerText
        }
      ));
    } else {
      setResponse(prevResponse => (
        {...prevResponse,
          show: true, 
          correct: false, 
          count: prevResponse.count + 1,
          answer: event.target.innerText
        }
      ));
    }
    setColor(prevColor => ({...prevColor, box: randomHexCode()}));
  };



// creates button elements by mapping through State.
  const btnElements = color.choices.map(choice => (
    <Button key={nanoid()} choice={choice} handleClick={checkAnswer}/>
  ));

  return (
    <main>
      <div className="main">
        <h1>Score: {response.score} / {response.count}</h1>
        <div className="color-box" style={{backgroundColor: `${color.box}`}}></div>
        <div className="btn-choices">
          {btnElements}
        </div>
      </div>
      {response.show && <p className="response">{response.answer} is {response.correct ? 'Correct' : 'Incorrect'}</p>}
    </main>
  )
}