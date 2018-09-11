import React from 'react';
import axios from 'axios';
import CourseComponent from './CourseComponent';
import _ from 'lodash';

export default class ListNewCourse extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      list:null
    }
  }

  updateCount(){
    const {list} = this.state;
    this.props.updateCourseCouter(list.length)
  }

  removeItem(course_id){
    _.remove(this.state.list,obj=>{
      return obj.id == course_id;
    });

    this.setState({
      list:this.state.list
    });

    this.updateCount();
  }

  componentWillMount(){
    axios.post('/api/dashboard/course/get-new-courses')
    .then(function(response){
      this.setState({
        list:response.data
      });
      this.updateCount();
    }.bind(this))
    .catch(function(err){

    })
  }

  render(){

    const {list} = this.state;
    const render = list == null ? <span>Đang tải...</span>
    :(
      <div>
        {
          list.length > 0 ? (
            <div>
              {
                list.map((node)=>{
                  return(
                    <CourseComponent key={node.id} object={node} removeMe={this.removeItem.bind(this)} />
                  )
                })
              }
            </div>
          ):<span>Không có khóa học nào!</span>
        }
      </div>
    )

    return(
      <div>
        {
          render
        }
      </div>

    )
  }
}
