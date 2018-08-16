import React from 'react';

import EventGroup from './EventGroup';
import './style.css';

export default class Schedule extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      days:['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật']
    }
  }


  render(){
    const {days} = this.state;

    return(
      <div className="cd-schedule loading">
      	<div className="timeline">
      		<ul>
            <li><span>08:00</span></li>
      			<li><span>09:00</span></li>
      			<li><span>10:00</span></li>
      			<li><span>11:00</span></li>
      			<li><span>12:00</span></li>
      			<li><span>13:00</span></li>
      			<li><span>14:00</span></li>
      			<li><span>15:00</span></li>
      			<li><span>16:00</span></li>
      			<li><span>17:00</span></li>
      			<li><span>18:00</span></li>
            <li><span>19:00</span></li>
            <li><span>20:00</span></li>
            <li><span>21:00</span></li>
            <li><span>22:00</span></li>
            <li><span>23:00</span></li>
            <li><span>24:00</span></li>
      		</ul>
      	</div>

      	<div className="events">
      		<ul>
            {
              days.map((n,k)=>{
                return(
                  <EventGroup key={k} value={n} />
                )
              })
            }
      		</ul>
      	</div>

      	<div className="event-modal">
      		<header className="header">
      			<div className="content">
      				<span className="event-date"></span>
      				<h3 className="event-name"></h3>
      			</div>

      			<div className="header-bg"></div>
      		</header>

      		<div className="body">
      			<div className="event-info"></div>
      			<div className="body-bg"></div>
      		</div>

      		<a href="#0" className="close">Close</a>
      	</div>

      	<div className="cover-layer"></div>
      </div>
    )
  }
}
