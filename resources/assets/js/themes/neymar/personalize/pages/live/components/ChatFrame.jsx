import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = {
  chat_list:{
    listStyleType:'none',
    overflowY:'auto',
    height:'calc(100vh - 256px)',
    paddingLeft:15
  },
  chat_item:{
    display:'inline-flex',
    fontSize:13,
    marginBottom:10
  },
  user_avatar:{
    width:30,
    height:30,
    marginRight:5
  },
  username:{
    color:'rgba(17,17,17,0.6)',
    fontWeight:600,
    marginRight:5
  },
  chat_content:{
    color:'rgba(17,17,17,1)',
  },
  input_chat:{
    paddingTop:15,
    paddingLeft:15,
    paddingBottom:15,
    display:'inline-flex',
    width:'100%',
    background:'rgba(238,238,238,0.4)'
  },
  online_list:{
    width:'100%',
    height:70,
    padding:5,
    display:'inline-block',
    background:'rgba(238,238,238,0.4)',
    overflowY:'hidden'
  },
  user_online:{
    width:20,
    height:20,
    borderRadius:'50%',
    marginRight:10
  },
  chat_frame_title:{
    color:'rgba(0, 0, 0, 0.87)',
    fontSize:15,
    marginBottom:5
  }
}

class Live extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      list:[1,1,1,1,1,1,1,1,1],
      online:[1,1,1,11]
    }


  }


  render(){

    const {classes} = this.props;

    return(
      <div className={classes.chat_root}>
        <div className={classes.online_list}>
          <Typography className={classes.chat_frame_title}>Học viên trực tuyến (10)</Typography>
          {this.state.online.map((node,key)=>{
            return(
              <span>
                <img className={classes.user_online} alt="Remy Sharp" src="https://material-ui.com/static/images/remy.jpg" />
              </span>
            )
          })}

        </div>
        <ul className={classes.chat_list}>
          {
            this.state.list.map((node,key)=>{
              return(
                <li className={classes.chat_item}>
                  <div className={classes.chat_item}>
                    <Avatar className={classes.user_avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/remy.jpg" />
                    <div>
                      <span className={classes.username}>fun with benji</span>
                      <span className={classes.chat_content}>@Aliya Khan tum jesi hasina ko koi jaan se marna chahega kya pgl 😍😍😂😂</span>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className={classes.input_chat}>
          <a href="#"><Avatar className={classes.user_avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/remy.jpg" /></a>
          <TextField
            label="Phạm Như ý"
            InputLabelProps={{
              shrink: true,
            }}
            className={classNames(classes.textField,"panth-input-chat")}
            margin="normal"
            placeholder="Say something..."
          />
        </div>
      </div>
    )
  }
}

Live.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Live);
