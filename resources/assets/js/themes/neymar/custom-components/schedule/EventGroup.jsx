import React from 'react';
import Events from './Events';
import TimeInput from 'material-ui-time-picker';
import { TimePicker } from 'material-ui-time-picker';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

/*import components*/


const { Button, Dialog, DialogActions } = require('@material-ui/core');

var time = new Date();

export default class EventGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      open:false,
      events:[]
    }
  }

  changeTimePicker(value){
    time = value;
  }

  addTimeEvent(){
    var end = time.getHours() + 2 < 24 ? time.getHours() + 2 : ( '0' + ((time.getHours()  +2) - 24));
    this.setState(
      {
        open: false,
        events:[...this.state.events,{
          data_start:time.getHours() + ':' + ((time.getMinutes() <10 ? '0':'') + time.getMinutes()),
          data_end:end + ':' + ((time.getMinutes() <10 ? '0':'') + time.getMinutes())
        }]
       }
     )
  }

  render(){

    const {value} = this.props;

    return(
      <li className="events-group">
        <div className="top-info">
          <span>{value}</span>
            <Tooltip title="Thêm khung giờ học" placement="top">
              <IconButton color="secondary" size="small" onClick={()=>this.setState({open:true})}>
                <Icon  style={{fontSize:'16px'}}>alarm</Icon>
              </IconButton>
            </Tooltip>
              <Dialog
                maxWidth='xs'
                open={this.state.open}
              >
                <TimePicker onChange={this.changeTimePicker.bind(this)} mode='24h' />
                <DialogActions>
                  <Button onClick={() => this.setState({ open: false })} color='primary'>
                    Cancel
                  </Button>
                  <Button onClick={this.addTimeEvent.bind(this)} color='primary'>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
        </div>
        <ul>
          {
            this.state.events.map((n,k)=>{
              return(
                <Events key={k} dataStart={n.data_start} dataEnd ={n.data_end}/>
              )
            })
          }
        </ul>
      </li>
    )
  }
}
