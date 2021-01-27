import React, {useState} from 'react'
import {Button, Collapse} from 'react-bootstrap'


export default function Home() {

    const [open, setOpen] = useState(false);
    return (
        <div style ={{ 
            marginTop:"20px",
            marginBottom:"20px"}}>
            <h1>Practice conjugations in Korean</h1> 
            <Button variant="outline-secondary"
            onClick={() => setOpen(!open)} 
               aria-controls="example-collapse-text"
               aria-expanded={open} block >
                   How to use</Button>
    
      <Collapse in={open}>
        <div id="example-collapse-text">
        <p>You need to know how to type korean into your computer.
        <br/>
            <a href="https://www.koreanfluent.com/cross_cultural/korean_keyboard/korean_keyboard.htm"
                target="_blank" rel="noreferrer">
                How to set up korean keyboard in Window10 </a>
                <br/>
            <a href="https://support.apple.com/en-ng/guide/korean-input-method/welcome/"
                target="_blank" rel="noreferrer">
                How to set up korean keyboard in Mac </a>
            </p>
            You will get 4 ramdom verbs. And you should choose ending particle that you want to practice.
            
            After that, type in your answer and check whether it is right or not. 
            
            If you face the verb that is not famillar with you, you can use 'About this verbs' Button.

            You can refresh verbs if you click 'Get new verbs' Button.

        
        
            <br/>    <br/>

            And if you sign up, you can make your own verb List. 
            <br/><br/>

            contact : myid@email.com
        </div>
      </Collapse>
    
            
            
            

        </div>
    )
}
