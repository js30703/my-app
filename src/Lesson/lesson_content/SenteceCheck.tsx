import React from 'react'
import parse from 'html-react-parser';


export default function SentenceCheck(props:any){
    let inp = props.inp
    let kor = props.kor
    if (props.inp.length === 0) {
        return(<div>write something</div>)
    }
   else{
        let color='<p>'
        for(let i = 0; i<inp.length; i++){
            if (inp[i] !== kor[i]) { // 다르면 빨간색
                color+= `<span style="color:red">${inp[i]}</span>`
            }
            else {
                color+= `${inp[i]}`
            }
            }
        color += '</p>'
            //return(<div>{color}</div>)
             return(<div>{kor}{
                parse(color)
             }</div>)
        }

    // else{
    //     let color=[]
    //     for(let i = 0; i<props.inp.length; i++){
    //         if (props.inp[i] != props.sent[i]) { // 다르면 빨간색
    //             color.push([props.inp[i], 'red'])
    //         }
    //         else {
    //             color.push([props.inp[i], 'black'])
    //         }
    //         }
    //         //return(<div>{color}</div>)
    //          return(<div>{color.map((c)=> {return( <p style={{ color:c[1]}}>{}</p>)})}</div>)
    //     }

}