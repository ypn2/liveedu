import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../logo.svg';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import FormHelperText from '@material-ui/core/FormHelperText';


import * as Actions from '../../actions/ActionsLogin';

import axios from 'axios';

const styles = {
  content:{
    marginTop:25,
    marginBottom:35,
    marginRight:24,
    marginLeft:24
  },
  card: {
    width:'100%',
    borderRadius:0,
    paddingBottom:15
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  logo:{
    width:80
  },
  flex: {
    flex: 1,
  },

  form_login:{
    display:'inline-flex'
  },

  input:{
    width:'100%'
  },
  card_external:{
    margin:15,
    marginTop:5,
    fontSize:12
  },

  input_login:{
    height:24,
    marginRight:15
  },
  icon:{color:'#aaa'}
};

const _dfState = {
  status:false,
  message:''
}


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      checked:false,
      error_reg_first_name:_dfState,
      error_reg_last_name:_dfState,
      error_reg_email:_dfState,
      error_reg_password:_dfState,
      error_reg_retype_password:_dfState
    }
  }


  toggleRegisterTrainer(){
    this.setState({
      checked:!this.state.checked
    });
  }

  resetState(){
    this.setState({
      error_reg_first_name:_dfState,
      error_reg_last_name:_dfState,
      error_reg_email:_dfState,
      error_reg_password:_dfState,
      error_reg_retype_password:_dfState
    })
  }

  submitRegister(){

    this.resetState();

    const reg_first_name = $('#reg_first_name').val();
    const reg_last_name = $('#reg_last_name').val();
    const reg_email = $('#reg_email').val();
    const reg_password = $('#reg_password').val();
    const reg_retype_password = $('#reg_retype_password').val();

    axios.post('/api/register',{
      reg_first_name,
      reg_last_name,
      email:reg_email,
      reg_password,
      reg_retype_password
    })
    .then(function(response){
      if(response.data=='success'){
        Actions.loginSuccess(response.data);
      }else{
        var _mess = response.data.message;

        if('reg_first_name' in _mess){
          this.setState({
            error_reg_first_name:{
              status:true,
              message:_mess.reg_first_name
            }
          });
        }

        if('reg_last_name' in _mess){
          this.setState({
            error_reg_last_name:{
              status:true,
              message:_mess.reg_last_name
            }
          });
        }

        if('email' in _mess){
          this.setState({
            error_reg_email:{
              status:true,
              message:_mess.email
            }
          });
        }

        if('reg_password' in _mess){
          this.setState({
            error_reg_password:{
              status:true,
              message:_mess.reg_password
            }
          });
        }

        if('reg_retype_password' in _mess){
          this.setState({
            error_reg_retype_password:{
              status:true,
              message:_mess.reg_retype_password
            }
          });
        }

      }
    }.bind(this))
    .catch(function(err){

    });

  }

  handleEnterPress(e){
    if (e.key === 'Enter') {
      this.submitLogin();
    }
  }

  submitLogin(){
    const log_email = $('#log_email').val();
    const log_password = $('#log_password').val();

    axios.post('/api/login',{
      log_email,
      log_password
    })
    .then(function(response){
      console.log(response.data);
      Actions.loginSuccess(response.data);
    })
    .catch(function(err){

    });
  }

  render(){

    const { classes } = this.props;
    const { checked } = this.state;
    var auth = true
    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            <img className={classes.logo} src={logo}/>
            <Typography variant="title" color="inherit" className={classes.flex}>
              PANTHEON
            </Typography>

            <div className={classes.form_login}>
                <input
                  id="log_email"
                  placeholder='Email'
                  type="email"
                  name="log_email"
                  className={classes.input_login}

                />
              <input
                  id="log_password"
                  type="password"
                  placeholder='Mật khẩu'
                  name="log_password"
                  onKeyPress={this.handleEnterPress.bind(this)}
                  className={classes.input_login}
                />
              <Button onClick={this.submitLogin} variant="contained" size="small" color="default"
                style={{
                  minHeight:23,
                  height:23,
                  padding:'0 10px',
                  fontSize:'0.733rem',
                  borderRadius:0
                }}>
                Đăng nhập
              </Button>
            </div>

          </Toolbar>
        </AppBar>

        <div className={classes.content}>
        <Grid container spacing={16}>
          <Grid item xs={8}>
          <iframe width="100%" height="450" src="https://www.youtube.com/embed/lPqmbx7y8_g" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={4}>
          <Card className={classes.card}>
            <CardContent>
              <div style={{marginBottom:15}}>
                <Typography variant="title">
                  Đăng ký
                </Typography>
              </div>

              <FormControl style={{width:'48%'}} error={this.state.error_reg_first_name.status?true:false}>
                <InputLabel htmlFor="firstname-error-text">Họ</InputLabel>
                <Input
                  id="reg_first_name"
                  type="text"
                  name="reg_first_name"
                />
              {
                this.state.error_reg_first_name.status ? <FormHelperText id="firstname-error-text">{this.state.error_reg_first_name.message}</FormHelperText> :null
              }

              </FormControl>

              <FormControl style={{width:'48%',float:'right'}} error={this.state.error_reg_last_name.status?true:false}>
                <InputLabel htmlFor="input-with-icon-adornment">Tên</InputLabel>
                <Input
                  id="reg_last_name"
                  type="text"
                  name="reg_last_name"
                />
                {
                  this.state.error_reg_last_name.status ? <FormHelperText id="firstname-error-text">{this.state.error_reg_last_name.message}</FormHelperText> :null
                }
              </FormControl>
              <br/><br/>
              <FormControl className={classes.input} error={this.state.error_reg_email.status?true:false}>
                  <InputLabel htmlFor="reg_email">Email</InputLabel>
                  <Input
                    id="reg_email"
                    type="email"
                    className={classes.input}
                    startAdornment={
                      <InputAdornment position="start">
                        <i className="material-icons" style={{color:'#aaa'}}>email</i>
                      </InputAdornment>
                    }
                  />
                {
                  this.state.error_reg_email.status ? <FormHelperText id="email-error-text">{this.state.error_reg_email.message}</FormHelperText> :null
                }

              </FormControl><br/><br/>

            <FormControl className={classes.input} error={this.state.error_reg_password.status?true:false}>
                <InputLabel htmlFor="reg_password">Mật khẩu</InputLabel>
                <Input
                  id="reg_password"
                  type="password"
                  className={classes.input}
                  startAdornment={
                    <InputAdornment position="start">
                      <i className="material-icons" style={{color:'#aaa'}}>lock</i>
                    </InputAdornment>
                  }
                />
                {
                  this.state.error_reg_password.status ? <FormHelperText id="email-error-text">{this.state.error_reg_password.message}</FormHelperText> :null
                }
            </FormControl><br/><br/>

          <FormControl className={classes.input} error={this.state.error_reg_retype_password.status?true:false}>
                  <InputLabel htmlFor="input-with-icon-adornment">Nhập lại mật khẩu</InputLabel>
                  <Input
                    id="reg_retype_password"
                    type="password"
                    className={classes.input}
                    startAdornment={
                      <InputAdornment position="start">
                        <i className="material-icons" style={{color:'#aaa'}}>lock</i>
                      </InputAdornment>
                    }
                  />
                {
                  this.state.error_reg_retype_password.status ? <FormHelperText id="email-error-text">{this.state.error_reg_retype_password.message}</FormHelperText> :null
                }
            </FormControl><br/><br/>

            <FormControlLabel
              control={
                <Checkbox

                  color="primary"
                  checked={checked} onChange={this.toggleRegisterTrainer.bind(this)}
                />
              }
              label="Đăng ký làm giảng viên"
            />

          <div>

            <Collapse in={checked}>

              <FormControl className={classes.input}>
                  <InputLabel htmlFor="input-with-icon-adornment">Công việc hiện tại</InputLabel>
                  <Input className={classes.input}/>
              </FormControl><br/><br/>

              <FormControl className={classes.input}>
                  <InputLabel htmlFor="input-with-icon-adornment">Kiến thức chuyên môn</InputLabel>
                  <Input className={classes.input}/>
              </FormControl><br/><br/>

              <FormControl className={classes.input}>
                  <InputLabel htmlFor="input-with-icon-adornment">Facebook cá nhân</InputLabel>
                  <Input className={classes.input}/>
              </FormControl><br/><br/>

              <FormControl className={classes.input}>
                  <InputLabel htmlFor="input-with-icon-adornment">Số điện thoại</InputLabel>
                  <Input className={classes.input}/>
              </FormControl><br/><br/>

              <FormControl className={classes.input}>
                  <InputLabel htmlFor="input-with-icon-adornment">Skype,Zalo</InputLabel>
                  <Input className={classes.input}/>
              </FormControl><br/><br/>



            </Collapse>

          </div>

            </CardContent>
            <CardActions>
              <Button onClick={this.submitRegister.bind(this)} variant="contained" size="small" color="primary">
                Đăng ký
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </div>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
