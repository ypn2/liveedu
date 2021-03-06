import React from 'react';
import {Route,Router,Switch} from "react-router-dom";

import RegisteredList from './pages/partner/PartnerRegistered';

import CourseListMaster from './pages/courses/course_list/CourseListMaster';


/*import pages*/


const Dashboard = () => (
  <h1>Dashboard</h1>
)

const Partner =()=>(
  <h1>Partner</h1>
)

const RegisterListPage = () => (
  <RegisteredList/>
)

const CourseList = ()=>(
  <CourseListMaster/>
)



export default class MainContent extends React.Component{
  render(){
    return(
      <Switch>

          <Route path='/personalize/dashboard' component={Dashboard} />

          <Route path='/personalize/courses/list' component={CourseList} />

          <Route path='/personalize/streammer-partner/registered-list' component={RegisterListPage} />

          <Route component={Dashboard} />

      </Switch>
    )
  }
}
