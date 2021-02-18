import React, {useState} from 'react'
import {Button, Collapse} from 'react-bootstrap'


export default function Home() {

    const [open, setOpen] = useState(false);
    return (
        <div style ={{ 
            width:'370px',
            marginTop:"20px",
            marginBottom:"15px"}}>
            <h1>Korean <br/>Conjugations</h1> 
            <Button variant="outline-secondary"
            onClick={() => setOpen(!open)} 
               aria-controls="example-collapse-text"
               aria-expanded={open} block >
                   How to use</Button>
    
      <Collapse in={open}>
        <div style={{marginTop:"20px",
            marginLeft:'10px',
            marginBottom:"15px"}} id="example-collapse-text">
        <p>You need to know how to type korean into your device.
        <br/>
            <a href="https://www.koreanfluent.com/cross_cultural/korean_keyboard/korean_keyboard.htm"
                target="_blank" rel="noreferrer">
                How to set up korean keyboard in Window10 </a>
                <br/>
            <a href="https://support.google.com/gboard/answer/7068494?co=GENIE.Platform%3DAndroid&hl=en"
            target="_blank" rel="noreferrer">
            How to set up korean keyboard in Android </a>
            <br/>
            <a href="https://support.apple.com/en-ng/guide/korean-input-method/welcome/"
                target="_blank" rel="noreferrer">
                How to set up korean keyboard in Mac </a>
            
            <br/>
            <a href="http://www.sweetandtastytv.com/blog/2016/5/25/how-to-install-korean-on-your-iphone-and-imac"
                target="_blank" rel="noreferrer">
                How to set up korean keyboard in iphone </a>
            </p>
            
            You will get 4 ramdom verbs. And you should choose endings to practice.
            
            After that, type in your answer and check whether it is right or not. 
            
            You can refresh verbs if you click 'Get new verbs' Button.
            <br/><br/>
            If you face verb that you don't know, you can use '?' Button.

            That will give you extra information.
            <br/><br/>
        

            And you can see numbers after verb like '쓰다01'. Those numbers distinguish Homophones. 

            For examples, 쓰다 can be 'write','wear','use'. So 쓰다01 is 'write', 쓰다02 is 'wear', 쓰다03 is 'use'
        
            <br/> <br/>

            And if you sign up, you can make your own verb List. 
            <br/><br/>

            contact : hangeulpha@gmail.com
        </div>
      </Collapse>
    
            
            
            

        </div>
    )
}
