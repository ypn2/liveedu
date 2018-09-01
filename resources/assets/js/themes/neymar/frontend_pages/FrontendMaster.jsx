import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../../logo.svg';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import SearchBar from 'material-ui-search-bar';
import {NavLink} from "react-router-dom";
import Notifications from '@material-ui/icons/Notifications';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';

import * as ActionsLogin from '../../../actions/ActionsLogin';


import MainContent from './MainContent';

const styles = {
  root: {
    flexGrow: 1,
  },
  footer:{
    width:'100%',
    height:150,
    background:'#3F51B5',
    paddingTop:24,
  },
  card: {
   maxWidth: 400,
 },
 media: {
   height: 0,
   paddingTop: '56.25%', // 16:9
 },
 actions: {
   display: 'flex',
 },
  content:{
    width:'100%',
    marginLeft:24,
    marginRight:24
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo:{
    width:80
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },

  polular:{
    background:"url('https://images.pexels.com/photos/583846/pexels-photo-583846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
    width:'100%',
    height:450,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSiz: "cover",
  },
  container:{
    width:1024,
    margin:'auto'
  },
  topLink:{
    color:'#fff',
    textDecoration:'none'
  }

};

class FrontendMaster extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      auth: true,
      anchorEl: null,
      unread:0,
      notifications:[],
      anchorElNoti:null,
    };

  }

  componentWillMount(){
    axios.post('/api/notification/get')
    .then(function(response){
        this.setState({
          unread:response.data.unread,
          notifications:response.data.all
        })
    }.bind(this))
    .catch(function(err){

    });
  }


  handleChange(event, checked) {
    this.setState({ auth: checked });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleNotification(event){
    this.setState({ anchorElNoti: event.currentTarget,unread:0 });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  };

  handleCloseMenuNoti(){
    this.setState({ anchorElNoti: null });
  }

  handleLogout(){
    this.setState({ anchorEl: null });
    axios.post('/api/logout')
    .then(function(response){
      if(response.data ==1){
          ActionsLogin.logout();
      }
    })
    .catch(function(err){

    })

  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl ,anchorElNoti ,list,listBlogs ,notifications} = this.state;
    const open = Boolean(anchorEl);
    const openMenuNoti = Boolean(anchorElNoti);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
              <NavLink to="/"><img className={classes.logo} src={logo}/></NavLink>
              <Typography variant="title" color="inherit" >
                PANTHEON
              </Typography>
            <div className={classes.flex}>
            </div>
            <SearchBar
              onChange={() => console.log('onChange')}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                margin: '0 auto',
                maxWidth: 800,
                height:32
              }}
            />
            <NavLink to="/stream-registration" className={classes.topLink}><Button color="inherit">Đăng ký stream partner</Button></NavLink>
            <NavLink to="/courses" className={classes.topLink}><Button color="inherit">Khóa học</Button></NavLink>
            <NavLink to="/posts" className={classes.topLink}><Button color="inherit">Blogs</Button></NavLink>
            <div>
              <IconButton
                aria-owns={openMenuNoti ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleNotification.bind(this)}

                >
                <Notifications style={{color:'#fff'}}/>
                {
                  this.state.unread!=0 ?(
                    <span style={{display:'block',top:5,right:5,width:17,height:17,background:'red',position:'absolute',borderRadius:'15%',fontSize:11,color:'#fff',fontWeight:'bold',paddingTop:'2px',textAlign:'center'}}>
                      {this.state.unread}
                    </span>
                  ):null

                }

              </IconButton>
              <Menu
                style={{minWidth:200}}
                id="menu-notification"
                anchorEl={anchorElNoti}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenuNoti}
                onClose={this.handleCloseMenuNoti.bind(this)}
              >
              <Typography style={{padding:5,outline:0}}>Thông báo</Typography><hr/>

                {
                  notifications.length >  0 ? (
                    <List style={{outline:0}}>
                      {
                        notifications.map(notification=>(
                          <div>
                            <ListItem>
                              <Avatar alt="Remy Sharp" src="http://pantheon-dev.ypn:8092/images/logo.svg" className={classes.avatar} />
                              <ListItemText primary={notification.data.message} secondary="July 20, 2014" />
                            </ListItem>
                            <Divider light />
                          </div>
                        ))
                      }
                    </List>
                  ):(
                    <Typography>Không có thông báo nào</Typography>
                  )
                }

              </Menu>
            </div>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu.bind(this)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose.bind(this)}
                >
                  <NavLink to="/personalize" onClick={this.handleClose.bind(this)}><MenuItem >Quản lý</MenuItem></NavLink>
                  <NavLink to="/trainer-management" onClick={this.handleClose.bind(this)}><MenuItem >Cá nhân</MenuItem></NavLink>
                  <MenuItem onClick={this.handleLogout.bind(this)}>Đăng xuất</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        {/*Main content frontend page*/}
        <MainContent />
        {/*End*/}

        <footer className={classes.footer}>
          <div style={{textAlign:'center'}}>
            <img src={logo} className={classes.logo}/>
            <br/>
            <a href="#" style={{color:'#fff'}}>pantheon.com</a>
          </div>
        </footer>
      </div>
    );
  }
}

FrontendMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FrontendMaster);
