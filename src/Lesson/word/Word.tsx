import React from 'react'

export default function Word(props:any){
    let {id, lesson_title, pub_date} = props.lesson
    return(
        <div style={{
            width:'370px',
            marginLeft: 'auto',
            marginRight:'auto',
            marginTop:'10px'
            }}>
            {lesson_title}
        </div>

    )
}