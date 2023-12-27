import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import HightlightText from '../Components/core/HightlightText';
import { Link } from 'react-router-dom';
import CTAButton from '../Components/core/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../Components/core/CodeBlocks';
import TimeLine from '../Components/core/TimeLine';
import ExploreMore from '../Components/core/ExploreMore';
import LearningLanguageSection from '../Components/core/LearningLanguageSection';
import Instructor from '../assets/Images/Instructor.png';
import Footer from '../Components/common/Footer';

const Home = () => {
  return (
    <div>
      <div className="flex flex-col relative mx-auto w-11/12 items-center text-white justify-between max-w-maxContent">
            <Link to="/signup">
              <div className="flex flex-center text-center items-center m-16 p-2 mx-auto rounded-full bg-richblue-700 font-bold text-richblack-200 transition -all duration-200 hover:scale-95 w-fit">
                <p>Become an instructor</p>
                <FaArrowRight />
              </div>
            </Link>
            <div className='text-4xl font-semibold mt-7'>
              Empower Your Education with 
              <HightlightText text="Coding Skills" />
            </div>
            <div className=' mt-4 flex justify-start w-[90%] text-centertext-lg font-bold text-richblack-50'>
              With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>
            <div className='flex gap-9 mt-8'>
              <CTAButton active={true} linkto={"/signup"} >
                Learn More
              </CTAButton>
              <CTAButton>
                Book a Demo
              </CTAButton>
            </div>
            <div className="">
              <video
                muted
                loop
                autoPlay
                >
                <source src={Banner} type="video/mp4"/>
              </video>
            </div>
      </div>
     <div className='w-11/12 max-w-maxContent p-10'>
        <ExploreMore />
     </div>
      <div className='mt-[200px]'>
        <div>
            <CodeBlocks 
              position ={"lg:flex-row"}
              heading={
                <div className='text-4xl font-semibold'>
                  Unlock your 
                  <HightlightText text="coding potential "/>
                  with our online courses.
                </div>
              }
              subheading={"Our courses and projects are designed to help you learn by doing. The best way to learn to code is to code."}
              ctabtn1={{active:true,linkto:"/signup",btnText:"Learn More"}}
              ctabtn2={{active:false,linkto:"/login",btnText:"Book a Demo"}}
              codeblock={
                `<!DOCTYPE html>
                <html>
                <head>
                <title>Page Title</title>
                </head>
                <body>
                <h1>This is a Heading</h1>
                <p>This is a paragraph.</p>
                </body>
                </html> `
              }
            />
        </div>

        <div>
            <CodeBlocks 
              position ={"lg:flex-row-reverse"}
              heading={
                <div className='text-4xl font-semibold'>
                  Unlock your 
                  <HightlightText text="coding potential "/>
                  with our online courses.
                </div>
              }
              subheading={"Our courses and projects are designed to help you learn by doing. The best way to learn to code is to code."}
              ctabtn1={{active:true,linkto:"/signup",btnText:"Learn More"}}
              ctabtn2={{active:false,linkto:"/login",btnText:"Book a Demo"}}
              codeblock={
                `<!DOCTYPE html>
                <html>
                <head>
                <title>Page Title</title>
                </head>
                <body>
                <h1>This is a Heading</h1>
                <p>This is a paragraph.</p>
                </body>
                </html> `
              }
            />
      </div>
    
    </div>

    <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[333px]'>
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='flex gap-9 mt-8'>
                    <CTAButton active={true} linkto={"/signup"} >
                        Explore Full Catelog
                    </CTAButton>
                    <CTAButton linkto={"/login"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>
        </div>
        <div className='flex'>
              <div className='w-[50%] m-10 text-3xl'>
                Get the skills you need for a 
                <HightlightText text="job that is in demand." />
              </div>
              <div className='flex flex-col justify-start'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive <br></br>specialist requires more than professional skills.
                <CTAButton active={true} linkto={"/signup"} >
                  Learn More
                  </CTAButton>
              </div>
        </div>

        <TimeLine />
        <LearningLanguageSection />
    </div>
    <div className='flex justify-center m-11/12 max-w-maxContent gap-8 ml-[100px]'>
          <div className=' flex justify-center w-[80%]'>
              <img src={Instructor}></img>
          </div>
          <div className='p-6 flex flex-col justify-center content-center '>
              <div className='text-richblack-50  text-2xl'>Become an 
                <HightlightText text=" Instructor" />
              </div>
              <p className='text-xl text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
              <CTAButton active={true} linkto={"/signup"} >
                Start Teaching Today
              </CTAButton>
          </div>
    </div>
    <Footer />
    </div>


  )
}

export default Home
