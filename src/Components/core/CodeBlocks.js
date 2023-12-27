import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    heading,subheading,ctabtn1,ctabtn2,linkto,position,codeblock
}) => {
  return (
    <div className={`flex ${position} my-20 mx-40 justify-between gap-10`}>
        <div className='w-[50%] flex flex-col gap-8 text-richblack-5'>
            {heading}
            <div className='text-richblack-600 font-bold'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>
    
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn2.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
        </div>
        <div className='text-yellow-50 w-[50%] flex border-2 border-richblack-600 '>
            <div>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>
            <div className='w-[90%] text-yellow-50'>
                <TypeAnimation
                    sequence={[codeblock,5000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={false}

                    style={
                        {
                            whiteSpace: "pre",
                        }
                    }
                />
            </div>
        </div>
    </div>

  )
}

export default CodeBlocks
