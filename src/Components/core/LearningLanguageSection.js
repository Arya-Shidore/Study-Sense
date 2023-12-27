import React from 'react'
import HightlightText from './HightlightText'
import knowYourProgress from '../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div>
      <div className='flex flex-col'>
        <p className='text-2xl flex justify-center'>
            Your swiss knife for 
            <HightlightText text= {" learning any language "}/>
        </p>
        <p className='flex justify-center'>
            Using spin making learning multiple languages easy. <br></br>with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>

      <div>
        <div className='flex max-w-[500px] ml-[150px] '>
            <img src={knowYourProgress} className='-ml-30'></img>
            <img src={compareWithOthers} className='-mr-40 -ml-20'></img>
            <img src={planYourLessons}></img>
        </div>
      </div>
      <div>
        <CTAButton active={true} linkto={"/signup"} >
        Learn More
        </CTAButton>
      </div>
    </div>
  )
}

export default LearningLanguageSection
