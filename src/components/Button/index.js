import React from 'react'

export default function Button(props) {
  return (
    <button
      className={`flex items-center px-10 py-4 border-2 rounded-full hover:bg-blue-primary border-pink-primary ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon && <img src={props.icon} alt="icon" width={30} />}
      <p className="ml-3 text-xl text-white-100">{props.title}</p>
    </button>
  )
}
