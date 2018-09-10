import React from 'react';
import axios from 'axios';
import CourseComponent from './CourseComponent';
import _ from 'lodash';

export default class ListNewCourse extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      list:[]
    }
  }

  removeItem(){
    this.setState({
      list:_.reject(this.state.list,{'id':3})
    })
  }

  componentWillMount(){
    axios.post('/api/dashboard/course/get-new-courses')
    .then(function(response){
      this.setState({
        list:response.data
      });
    }.bind(this))
    .catch(function(err){

    })
  }

  render(){

    const {list} = this.state;

    return(
        list.map((node,key)=>{
          return(
            <CourseComponent key={key} object={node} removeMe={this.removeItem.bind(this)}/>
          )
        })
    )
  }
}
