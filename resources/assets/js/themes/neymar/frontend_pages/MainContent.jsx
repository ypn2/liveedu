import React from 'react';
import {Route} from "react-router-dom";

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
      <div  style={{minHeight:400}}>
        <Route exact path="/" component={HomeMasterPage} />
        <Route path="/fr/posts" component={BlogMasterPage} />
        <Route path="/fr/p" component={PostDetailPage}/>
        <Route path="/fr/courses" component={CourseMasterPage} />
        <Route path="/fr/course_detail" component={CourseDetailPage} />
        <Route path="/fr/trainers" component={ListTrainersMasterPage} />
        <Route path="/fr/channel" component={ChannelComponent} />
      </div>
    )
  }
}
