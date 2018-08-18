import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
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
import logo from '../../logo.svg';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as Actions from '../../actions/ActionsLogin';

import axios from 'axios';

const styles = {
  content:{
    marginTop:75,
    marginBottom:35,
    marginRight:24,
    marginLeft:24
  },
  card: {
    width:500,
    borderRadius:0,
    paddingBottom:15,
    margin:'auto',
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


class LoginAttempt extends React.Component{
  constructor(props){
    super(props);
    this.state={
      checked:false
    }
  }


  toggleRegisterTrainer(){
    this.setState({
      checked:!this.state.checked
    });
  }

  submitRegister(){
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
        //Actions.loginSuccess();
      }
    })
    .catch(function(err){

    });

  }

  submitLogin(){
    const log_email = $('#log_email').val();
    const log_password = $('#log_password').val();

    axios.post('/api/login',{
      log_email,
      log_password
    })
    .then(function(response){
      console.log('#login:' + response.data);
      if(response.data=='success'){
        Actions.loginSuccess();
      }
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
          </Toolbar>
        </AppBar>

        <div className={classes.content}>
          <Card className={classes.card}>

            <CardHeader
              title={<Typography variant="title" style={{textAlign:'center'}}>Đăng nhập</Typography>}
              >
            </CardHeader>
            <Divider/>
            <CardContent style={{padding:'30px 80px 0px'}}>
              <FormControl className={classes.input} error aria-describedby="name-error-text">
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
                <FormHelperText id="name-error-text">Emai đăng nhập không chính xác</FormHelperText>
              </FormControl><br/><br/>

              <FormControl className={classes.input}  error aria-describedby="name-error-text">
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
              <FormHelperText id="name-error-text">Mật khẩu đăng nhập không chính xác</FormHelperText>
            </FormControl><br/><br/>
        </CardContent>

        <CardActions style={{paddingLeft:80}}>
          <Button variant="contained" size="small" color="primary">
            Đăng nhập
          </Button>
        </CardActions>

          </Card>
        </div>
      </div>
    )
  }
}

LoginAttempt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginAttempt);
