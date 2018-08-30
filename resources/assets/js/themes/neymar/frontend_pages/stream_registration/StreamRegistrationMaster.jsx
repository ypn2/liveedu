import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { Editor } from '@tinymce/tinymce-react';

import ThemeContext from '../../configs/context';
import axios from 'axios';

const styles={
  appBar: {
    position: 'relative',
  },
  avatar: {
    margin: 10,
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  textfield:{
    width:'500px'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  flex: {
    flex: 1,
  },
}

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

var _tinymce ='';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class StreamRegistrationMaster extends React.Component{

  constructor(){
    super();
    this.state = {
      register:null,
      name:[],
      listField:[],
      openDialog:false
    }
  }

  componentWillMount(){
    axios.post('/api/partner/check')
    .then(function(response){
      switch (response.data.status) {
        case -1:
          this.setState({
            register:{
              status:false
            }
          });
          break;
        case 0:
          this.setState({
            register:{
              status:true,
              active:false
            }
          });

          break;
        case 1:

          this.setState({
            register:{
              status:true,
              active:true
            }
          });

          break;
        default:

      }
      console.log(this.state.register.status);
    }.bind(this))
    .catch(function(err){

    });

    axios.post('/api/fields/list')
    .then(function(response){
      this.setState({
        listField:response.data
      })
    }.bind(this))
    .catch(function(err){

    })
  }

  handleEditorChange(event){
    _tinymce = event.target.getContent();
  }

  handleChange (event) {
    this.setState({ name: event.target.value });
  };

  handleClickOpen(){
    this.setState({
      openDialog:true
    })
  }

  handleClose(){
    this.setState({
      openDialog:false
    })
  }

  //Gửi thông tin đăng ký partner
  submitRegistation(){

    const reg_fields = $('#reg_fields').val();
    const reg_current_job = $('#reg_current_job').val();
    const reg_current_org = $('#reg_current_org').val();
    const reg_fb = $('#reg_fb').val();
    const reg_phone = $('#reg_phone').val();
    const reg_own_introduce = _tinymce;

    axios.post('/api/partner/register',{
      reg_fields,
      reg_current_job,
      reg_current_org,
      reg_fb,
      reg_phone,
      reg_own_introduce
    })
    .then(function(response){
      if(response.data.code ==200){
        this.setState({
          register:{
            status:true
          }
        });

      }else{
        if((response.data.message)[0] ===23000){
            alert('Đăng ký không thành công! Thông tin đăng ký của bạn đang được quản trị viên xét duyệt. Vui lòng chờ kết quả trong 24h ');
        }
      }
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })

  }

  render(){

    const {classes} = this.props;

    return(
    <div>
      {
        this.state.register!=null ? (
          <ThemeContext.Consumer>
            {
              context=>(
                <div  className="_main-content" style={{paddingBottom:15,minHeight:'80vh'}}>
                  <ListItem>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/remy.jpg" className={classes.avatar} />
                    <ListItemText primary={context.user.name} secondary="July 20, 2014" />
                  </ListItem>
                  {
                    this.state.register.status ? (
                      <div>
                        {
                          this.state.register.active ? (
                            <div>
                              <h1>Bạn đã đăng ký streammer parter thành công. truy cập vào danh mục cá nhân để tao khóa học của bạn</h1>
                            </div>
                          ):(
                            <h1>Thông tin của bạn đang được quản trị viên xem xét. Vui lòng chờ đợi kết quả hoặc liên hệ với quản trị viên nếu bạn gặp vấn đề trong quá trình đăng ký</h1>
                          )
                        }
                      </div>
                    ):
                    (
                      <div>
                        <div className="_block-qoute">
                          The more we share, the more we have.
                          <span>LEONARD NIMOY</span>
                        </div>
                        <div >
                          <ul style={{color:'rgba(0,0,0,0.8)',paddingLeft:15}}>
                            <li><h4>Trở thành stream partner, bạn sẽ có thể mở các khóa học của mình, chia sẻ kiến thức không giới hạn.</h4></li>
                            <li><h4>Bạn cần là người có kinh nghiệm và chuyên môn cao trong lĩnh vực bạn sẽ giảng dạy.</h4></li>
                            <li><h4>Hoàn thiện hồ sơ ngay để mọi người đều thấy kinh nghiệm của bạn.</h4></li>
                          </ul>
                        </div>
                        <Button onClick={this.handleClickOpen.bind(this)} variant="contained" color="secondary" >Đăng ký streamer partner</Button>

                          <Dialog
                            fullScreen
                            open={this.state.openDialog}
                            onClose={this.handleClose}
                            TransitionComponent={Transition}
                          >
                          <AppBar className={classes.appBar}>
                            <Toolbar>
                              <IconButton color="secondary" onClick={this.handleClose.bind(this)} aria-label="Close">
                                <CloseIcon />
                              </IconButton>
                              <Typography variant="title" color="inherit" className={classes.flex}>
                                Đăng ký làm streammer partner
                              </Typography>
                              <Button color="inherit" variant="contained" color="secondary" onClick={this.submitRegistation.bind(this)}>
                                Gửi đăng ký
                              </Button>
                            </Toolbar>
                          </AppBar>

                          <div style={{padding:'5px 48px'}}>
                            <ListItem>
                              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/remy.jpg" className={classes.avatar} />
                              <ListItemText primary={context.user.name} secondary="July 20, 2014" />
                            </ListItem>
                            <Divider />
                            <div style={{paddingTop:15}}>
                              <Grid container  spacing={16}>
                              <Grid item xs={5}>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Lĩnh vực chuyên môn</InputLabel>
                                <Select
                                  className={classes.textfield}
                                  multiple
                                  id="reg_fields"
                                  value={this.state.name}
                                  onChange={this.handleChange.bind(this)}
                                  input={<Input id="select-multiple-checkbox" />}
                                  renderValue={selected => (
                                   <div className={classes.chips}>
                                     {selected.map(value => <Chip key={value} label={value} />)}
                                   </div>
                                 )}
                                  MenuProps={MenuProps}
                                >
                                  {this.state.listField.map(field => (
                                    <MenuItem key={field.id} value={field.title}>
                                      <Checkbox checked={this.state.name.indexOf(field.title) > -1} />
                                      <ListItemText primary={field.title} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <br/><br/><br/>
                              <FormControl>
                                <TextField
                                  required
                                  id="reg_current_job"
                                  type="text"
                                  name="reg_current_job"
                                  label="Công việc hiện tại"
                                  className={classes.textfield}
                                />
                              </FormControl>

                              <br/><br/><br/>
                              <FormControl>
                                <TextField
                                  required
                                  id="reg_current_org"
                                  type="text"
                                  name="reg_current_job"
                                  label="Nơi công tác hiện tại"
                                  className={classes.textfield}
                                />
                              </FormControl>

                              <br/><br/><br/>
                              <FormControl>
                                <TextField
                                  required
                                  id="reg_fb"
                                  type="text"
                                  name="reg_fb"
                                  label="Facebook cá nhân"
                                  className={classes.textfield}
                                />
                              </FormControl>

                              <br/><br/><br/>
                              <FormControl>
                                <TextField
                                  required
                                  id="reg_phone"
                                  type="number"
                                  name="reg_phone"
                                  label="Số điện thoại liên lạc"
                                  className={classes.textfield}
                                />
                              </FormControl>
                              </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="title">Giới thiệu về bản thân và kinh nghiệm</Typography>
                                  <br/>
                                  <TinyMCE
                                      id="reg_own_introduce"
                                      name="reg_own_introduce"
                                      config={{
                                        plugins: 'link image lists preview',
                                        height:235
                                      }}
                                      onChange={this.handleEditorChange}
                                    />

                                </Grid>
                            </Grid>
                            </div>
                          </div>
                        </Dialog>
                      </div>
                    )
                  }
                </div>
              )
            }
          </ThemeContext.Consumer>
        ):null
      }
    </div>
    )
  }
}


StreamRegistrationMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StreamRegistrationMaster);
