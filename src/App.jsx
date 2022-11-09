import React, { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import './index.css'

export default function App() {
  const [color, setColor] = useState(randomHexCode());
  const [response, setResponse] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState('');
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateChoices();
  }, [color]);


  function randomHexCode(){
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    let hexCode = '#';
    while( hexCode.length < 7 ){
      hexCode += digits[Math.floor(Math.random() * 16)]
    }
    return hexCode;
  };


  function generateChoices() {
    let choiceData = [color, randomHexCode(), randomHexCode()]
    // Fisher-Yates Shuffle
    for (let i = choiceData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = choiceData[i];
      choiceData[i] = choiceData[j];
      choiceData[j] = temp;
    }
    setChoices(choiceData);
  };


  function checkAnswer(event) {
    if (event.target.innerText === color){
      setCorrect(true);
      setScore(prevScore => prevScore + 1);
    } else {
      setCorrect(false);
    }
    setCount(prevCount => prevCount + 1);
    setAnswer(event.target.innerText);
    setColor(randomHexCode());
    setResponse(true);
  };


  const btnElements = choices.map(choice => (
    <button key={nanoid()} className="btn-choice" onClick={checkAnswer}>{choice}</button>
  ));

  return (
    <main>
      <h1>Score: {score} / {count}</h1>
      <div className="color-box" style={{backgroundColor: `${color}`}}></div>
      <div className="btn-choices">
        {btnElements}
      </div>
      {response && <p className="response">{answer} is {correct ? 'Correct' : 'Incorrect'}</p>}
    </main>
  )
}