import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active,linkto}) => {
  return (
    <div>
      
    <Link to={linkto}>
        <div className={`flex m-16 p-1 mx-auto rounded-full bg-richblue-700 font-bold text-richblack-200 transition -all duration-200 hover:scale-95 w-fit ${active ? 'bg-yellow-50 text-black' : 'bg-richblack-800'} hover:scale-95 transition-duration: 75ms`}>
            <p>{children}</p>
        </div>
    </Link>
    </div>
  )
}

export default CTAButton
