import React,{useEffect, useState} from 'react'
import {ListGroup} from 'react-bootstrap'
import Axios from 'axios'

export default function LessonList(prop:any){
    let [lessons,setLessons] = useState([{"id":'1', "lesson_title":'title', "pub_date":"2010-10-10"}])
 

  useEffect(()=>{
    Axios.get(`https://www.hangeulpha.com/backend/lessons/`).then( res => {
      setLessons(res.data)
    })
  },[])

    return (
        <div style={{
            width:'370px',
            marginLeft: 'auto',
            marginRight:'auto',
            marginTop:'10px'
            }}>
            <div style={{marginTop:'20px'}}>
            <ListGroup as="ul">
            <ListGroup.Item as="li" variant="dark">
                For beginners
            </ListGroup.Item>
            
            
            </ListGroup>
            </div>

            <div style={{marginTop:'20px'}}>
            <ListGroup as="ul">
            <ListGroup.Item as="li" variant="dark">
                for intermediate
            </ListGroup.Item>
            {lessons.map((a)=>{
                return(
                 <ListGroup.Item key={a.id} as="li">
                    <a style={{textDecoration:"none", backgroundColor:'none'}} href={`/lessons/${a.id}`}>
                    {a.lesson_title}
                    </a>
            </ListGroup.Item>)})
            }
           
            
            </ListGroup>
            </div>
        </div>
    )
}
