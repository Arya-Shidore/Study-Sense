import React from 'react'
import Logo1 from '../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../assets/TimeLineLogo/Logo4.svg'
import { useState } from 'react'
import img from '../../assets/Images/TimelineImage.png'


const TimeLineData = [
    {
        Logo: Logo1,
        heading: "Heading 1",
        Description: "Description 1"
    },
    {
        Logo: Logo2,
        heading: "Heading 2",
        Description: "Description 2"
    },
    {
        Logo: Logo3,
        heading: "Heading 3",
        Description: "Description 3"
    },
    {
        Logo: Logo4,
        heading: "Heading 4",
        Description: "Description 4",
    }
]
const TimeLine = () => {
    const [data,setData]=useState(TimeLineData)
  return (
    <div className='flex m-10'>
      <div className='flex flex-col justify-center w-[50%]'>
        {
            TimeLineData.map((data) => {
                return (
                    <div className='flex gap-20 ml-20 mb-8'>
                        <div className='bg-white flex items-center p-4 rounded-full '>
                            <img src={data.Logo} alt="" />
                        </div>
                        <div>
                            <h1>{data.heading}</h1>
                            <p>{data.Description}</p>
                        </div>
                    </div>
                )
            })
        }
      </div>
      <div className='relative flex flex-col'>
            <img
                src={img}
            ></img>
      </div>
    </div>
  )
}

export default TimeLine
