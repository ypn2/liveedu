import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom";

import HomeMaster from './homepage/HomeMaster';
import BlogMaster from './blog/BlogMaster';
import CourseMaster from './course/CourseMaster';
import LiveMaster from './live/LiveMaster';
import PostDetail from './blog/post/PostMaster';
import CourseDetail from './course_detail/CourseDetail';
import ChannelMaster from './channel/ChannelMaster';

const HomeMasterPage = ()=>(
  <HomeMaster/>
)

const BlogMasterPage = ()=>(
  <BlogMaster/>
)

const CourseMasterPage = ()=>(
  <CourseMaster/>
)

const ListTrainersMasterPage = ()=>(
  <LiveMaster/>
)

const PostDetailPage = () => (
  <PostDetail/>
)

const CourseDetailPage = ()=>(
  <CourseDetail/>
)

const ChannelComponent = ()=>(
  <ChannelMaster/>
)

export default class  MainContent extends React.Component{
  render(){
    return(
      <Switch>
        <Route path="/posts" component={BlogMasterPage} />
        <Route path="/p" component={PostDetailPage}/>
        <Route path="/courses" component={CourseMasterPage} />
        <Route path="/course_detail" component={CourseDetailPage} />
        <Route path="/trainers" component={ListTrainersMasterPage} />
        <Route path="/channel" component={ChannelComponent} />
        <Route component={HomeMaster} />
      </Switch>
    )
  }
}
