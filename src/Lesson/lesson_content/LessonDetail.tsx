import React,{useState, useEffect} from 'react'
import Sentence from './Sentece'
import {Howl} from 'howler';
import {Button} from 'react-bootstrap'
import Axios from 'axios'


export default function LessonDetail(props:any) {
    let {id, lesson_title, pub_date} = props.lesson
    let b = 0
    const [isPlaying, setIsPlaying] = useState(true)
    let [sentence,setSentence] = useState([
        {"id":"1", "lesson":"1", "order":"1" , "kor":"오늘은 설날이에요.","eng":"Today is New Year's Day."},
    ])

    useEffect(()=>{
            Axios.get(`https://www.hangeulpha.com/backend/lessons/${id}/`
                ).then( res => {
              setSentence(res.data)
            })
          },[b])

    let H = new Howl(
        {
            src:[`https://www.hangeulpha.com/static/lessons/${id}/${id}-0.mp3`],
            volume: 0.5,
            onend: () => {setIsPlaying(true)}
        }
    )

    
        
    return (
            <div style={{
                width:'370px',
                marginLeft: 'auto',
                marginRight:'auto',
                marginTop:'10px'
                }}>
               
               
                
                <h1>{lesson_title}</h1>
                <a>{pub_date}</a>
                <br/>
                <img width='100%' height="220px" style={{objectFit:'contain',position:'relative',display:'block'}} 
                    alt={lesson_title} src={`https://www.hangeulpha.com/static/lessons/${id}/image.jpg`}></img>
                <br/>
                <div style={{marginBottom:'20px'}}>
                {isPlaying ?<Button variant="outline-secondary" 
                onClick ={() =>{ setIsPlaying(!isPlaying); H.play()}} block> Listen </Button> : <Button variant="outline-secondary" 
                disabled block> Listen </Button>}
                </div>

                <p>{sentence.map((a)=>{return(" "+a.kor)})}</p>
                <br/>
                <p>{sentence.map((a)=>{return(" "+a.eng)})}</p>
                
              
                <div style={{marginTop:'30px'}}>               
                    <h2>Dictation</h2>               
                    {sentence.map( (a) => { return (<Sentence key={a.id} sent={a}/>)})}
                </div> 
            </div>        
    )
}