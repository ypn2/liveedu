import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
      anchorEl: null
    };

  }


  handleChange(event, checked) {
    this.setState({ auth: checked });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  handleLogout(){
    this.setState({ anchorEl: null });
    axios.post('/api/logout')
    .then(function(response){
      ActionsLogin.logout();
    })
    .catch(function(err){

    })

  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl ,list,listBlogs} = this.state;
    const open = Boolean(anchorEl);

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
          <NavLink to="/trainers" className={classes.topLink}><Button color="inherit">Giảng viên</Button></NavLink>
            <NavLink to="/courses" className={classes.topLink}><Button color="inherit">Khóa học</Button></NavLink>
            <NavLink to="/posts" className={classes.topLink}><Button color="inherit">Blogs</Button></NavLink>
            <IconButton><Notifications style={{color:'#fff'}}/></IconButton>
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
