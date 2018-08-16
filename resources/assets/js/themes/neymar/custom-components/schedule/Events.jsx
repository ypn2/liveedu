import React from 'react';

export default class Events extends React.Component{

  getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
	}

  render(){

    const {dataStart,dataEnd} = this.props;
    const milestones = '08:00';

    var offset = this.getScheduleTimestamp(dataStart) - this.getScheduleTimestamp(milestones);

    var y_offset = (5/6) * offset - 1;

    console.log(y_offset);

    return(
      <li className="single-event" style={{
          top:`${y_offset}px`,
          height:100,
          display:'block'

        }} data-content="event-abs-circuit" data-event="event-1">
        <a href="#0">
          <em className="event-name">Bắt đầu:{dataStart}</em>
          <br/>
          <em className="event-name">Kết thúc:{dataEnd}</em>
        </a>
      </li>
    )
  }
}
