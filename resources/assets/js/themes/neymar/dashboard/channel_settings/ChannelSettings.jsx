import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import AccessAlarms from '@material-ui/icons/AccessAlarms';
import DraftsIcon from '@material-ui/icons/Drafts';
import School from '@material-ui/icons/School';
import Class from '@material-ui/icons/Class';
import Https from '@material-ui/icons/Https';
import Note from '@material-ui/icons/Note';
import ListItemText from '@material-ui/core/ListItemText';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3002');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  flexGrid:{
    display:'inline-flex'
  },
  isStreamOn:{
    color:'green',
  },
  isStreamOff:{
    color:'#aaa'
  }
});

class ChannelSettings extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      isStreamConnected:false,
      isStreamAvailabled:false,
      count_down:10
    }
  }

  componentDidMount(){
    var _self = this;
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });

    _self.player.src({
      src: 'http://localhost:8088/live/J42ninLbjl2E2V8ePqy7/index.m3u8',
      type: 'application/x-mpegURL'
    });
    _self.player.play();

    socket.on('on_connect', data=>{
      _self.setState({
        isStreamConnected:true
      });
    });

    socket.on('on_done', data=>{
      _self.setState({
        isStreamConnected:false,
        isStreamAvailabled:false
      })
    });

    socket.on('on_publish', data=>{
      setTimeout(function(){
        _self.player.src({
          src: 'http://localhost:8088/live/J42ninLbjl2E2V8ePqy7/index.m3u8',
          type: 'application/x-mpegURL'
        });
        _self.player.play();

        _self.setState({
          isStreamAvailabled:true
        })

      },10000);
    });
  }

  render(){
    const { classes } = this.props;

    var _streamStatus = 'Luồng ngoại tuyến';

    if(this.state.isStreamConnected){
      if(this.state.isStreamAvailabled){
        _streamStatus = 'Luồng đang trực tuyến'
      }else{
        _streamStatus = 'Đang nạp luồng...'
      }

    }

    return(
      <div>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <Icon className={ this.state.isStreamConnected ? classes.isStreamOn : classes.isStreamOff }>fiber_manual_record</Icon>
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                { _streamStatus }
              </Typography>
              <Button disabled={!this.state.isStreamAvailabled} variant="contained" color="primary"><Icon className={classes.extendedIcon}>surround_sound</Icon>Phát trực tiếp</Button>
            </Toolbar>
          </AppBar>
        </div>

        <Card style={{marginBottom:30,borderTopRightRadius:0,borderTopLeftRadius:0}}>
            <CardContent className={classes.flexGrid}>
              <div>
                <div data-vjs-player style={{width:600,height:300}}>
                 <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-button vjs-big-play-centered vjs-16-9"
                    muted
                    controls preload="auto"
                    data-setup='{"poster":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4j4oUh2F5EW6qpPLFPi_pA-fbdAfOK3u0jRCBqjhvdLXeA3PH"}'>
                    >

                 </video>
               </div>

              </div>
              <div style={{marginLeft:15}}>
                <List component="nav">
                <ListItem button>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary="Khóa học: Lập trình react cơ bản" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Class />
                  </ListItemIcon>
                  <ListItemText primary="Lớp học: lớp 1" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <Note />
                  </ListItemIcon>
                  <ListItemText primary="Bài học: Bài 1- Giới thiệu react cài đặt môi trường" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <AccessAlarms />
                  </ListItemIcon>
                  <ListItemText primary="Thời gian học học: 20h:30" />
                </ListItem>
              </List>
              </div>
            </CardContent>
        </Card>

        <Card style={{marginBottom:30}}>
            <CardHeader style={{borderBottom:'2px solid #3f51b5',fontSize:'12px'}} title="Stream info"></CardHeader>
            <CardContent>
              <div>
                <Button style={{width:35,height:35}} variant="fab" color="secondary" aria-label="edit">
                  <Icon>camera_alt_icon</Icon>
                </Button>
                <span>  Chọn ảnh cho bài học.</span>
              </div><br/>
              <FormControl style={{minWidth:500}}>
                <InputLabel htmlFor="age-simple">Chọn lớp học</InputLabel>
                <Select value="12">
                  <MenuItem value="0">
                    <em style={{color:'#3f51b5'}}>Lớp học đang mở</em>
                  </MenuItem>
                  <MenuItem value="1">Lớp react cơ bản 1</MenuItem>
                  <MenuItem value="2">Lớp react cơ bản 2</MenuItem>
                  <MenuItem value="3">Lớp lập trình nodejs 1</MenuItem>
                </Select>
              </FormControl>
              <br/><br/>
              <FormControl style={{minWidth:500}}>
                <InputLabel htmlFor="age-simple">Chọn bài học phát sóng</InputLabel>
                <Select value="12">
                  <MenuItem value="0">
                    <em style={{color:'#3f51b5'}}>Lớp học đang mở</em>
                  </MenuItem>
                  <MenuItem value="1">Bài 1: Giới thiệu về Reactjs</MenuItem>
                  <MenuItem value="2">Bài 2: Props và state</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
        </Card>
        <Card>
            <CardHeader style={{borderBottom:'2px solid #3f51b5'}} title="ENCODER SETTUP"></CardHeader>
            <CardContent>
                <TextField
                  id="server_url"
                  label="Stream url"
                  value="rtmp://192.168.0.56/hls"
                  readOnly
                />
                <br/><br/>
                <TextField
                  id="entry_course_name"
                  label="Stream name/key"
                  value="rc56-qb42-6wgj-6v04"
                  readOnly
                />
            </CardContent>
        </Card>
      </div>
    )
  }
}

ChannelSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelSettings);
