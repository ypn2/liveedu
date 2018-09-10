import React from 'react';
import axios from 'axios';
import CourseComponent from './CourseComponent';

export default class ListNewCourse extends React.Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
    axios.post('/api/dashboard/course/get-new-courses')
    .then(function(response){
      console.log(response.data);
    })
    .catch(function(err){

    })
  }

  render(){

    const list= [1,1,11,1]

    return(
        list.map((node,key)=>{
          return(
            <CourseComponent key={key}/>
          )
        })
    )
  }
}
