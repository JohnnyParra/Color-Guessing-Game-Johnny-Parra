import React from 'react'

export default function Button(props){
  return(
    <button className="btn-choice" onClick={props.handleClick}>{props.choice}</button>
  )
}