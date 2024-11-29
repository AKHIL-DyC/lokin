import React from 'react'
import WModel from '../Wmodel'
import Timer from '../Timer'
import Quotes from '../Quotes'
const page = () => {
  return (
    <div style={{display:'flex'}}>
        <div style={{width:"80vw",height:"100vh",display:"flex",justifyContent:'center',alignItems:'center'}}>
            <Quotes/>
        </div>
        <div style={{display:'flex',paddingTop:'0vh',flexDirection:'column',gap:'12vh'}}>
        <Timer/>
        <WModel/>
        </div>
    </div>
  )
}

export default page