
import React from 'react'
import Jamo from '../jamo/Jamo';
import Login from '../auth/login';
import Signup from '../auth/Signup';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Myverbs from '../Myverb/Myverbs';
import Reset from '../auth/reset';
import LessonList from '../Lesson/LessonList';
import LessonDetail from '../Lesson/lesson_content/LessonDetail';
import Notfound from './Notfound';
import { useEffect,useState } from 'react';
import Axios from'axios'
import Word from '../Lesson/word/Word';


export default function Routes() {

  let [lessons,setLessons] = useState([{"id":'1', "lesson_title":"HIHIHI", "pub_date":"0101-01-01"}])

  useEffect(()=>{
    Axios.get(`https://www.hangeulpha.com/backend/lessons/`).then( res => {
      setLessons(res.data)
    })
  } , [])

   return (
      <BrowserRouter>
      
        <Switch>
          <Route exact path='/' component={Jamo}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/myverbs' component={Myverbs}/>
          <Route exact path='/reset' component={Reset}/>
          <Route exact path='/lessons' component={LessonList}/>

          {
          lessons.map( (lesson) => {
              return(<div key={lesson.id+'div'}>
              <Route key={lesson.id} exact path={`/lessons/${lesson.id}`} 
                     render={()=> <LessonDetail lesson={lesson}/>} />

              <Route key={lesson.lesson_title} exact path={`/lessons/${lesson.id}/word`} 
                render={()=> <Word lesson={lesson}/>} />
                     </div>)
          })
          }
          
          <Route component={Notfound} status={404} path="*"/>
  

        </Switch>      
      </BrowserRouter>

  );
}



