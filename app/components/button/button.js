import React from 'react'

const Button = (props) => {
  return (
          <button className="   text-base font-normal border-solid border-transparent rounded-xl border-2 py-4 px-7 bg-[#0071e3] w-[100%] min-w-[30px]  text-white	"
              onClick={props.onClick}
              disabled={props.disabled}
          >
              {props.text}
          </button>
  )
}

export default Button