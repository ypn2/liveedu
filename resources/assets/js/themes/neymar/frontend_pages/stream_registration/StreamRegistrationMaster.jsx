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
import TinyMCE from 'react-tinymce';

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

const names = [
  'Lập trình',
  'Ngoại ngữ',
  'Tiếng Anh',
  'Tiếng Trung',
  'Tiếng Nhật',
  'Thiết kế đồ họa',
  'Toán THPT',
  'Âm nhạc'
];

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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
      name:[],
      openDialog:false
    }
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


  render(){

    const {classes} = this.props;

    return(
      <div className="_main-content" style={{paddingBottom:15,minHeight:'80vh'}}>
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
              <Button color="inherit" variant="contained" color="secondary" onClick={this.handleClose.bind(this)}>
                Gửi đăng ký
              </Button>
            </Toolbar>
          </AppBar>

          <div style={{padding:'5px 48px'}}>
            <ListItem>
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/remy.jpg" className={classes.avatar} />
              <ListItemText primary="Lê Kiều Ân" secondary="July 20, 2014" />
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
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={this.state.name.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br/><br/><br/>
              <FormControl>
                <TextField
                  required
                  id="current_job"
                  label="Công việc hiện tại"
                  className={classes.textfield}
                />
              </FormControl>

              <br/><br/><br/>
              <FormControl>
                <TextField
                  required
                  id="current_org"
                  label="Nơi công tác hiện tại"
                  className={classes.textfield}
                />
              </FormControl>

              <br/><br/><br/>
              <FormControl>
                <TextField
                  required
                  id="fb"
                  label="Facebook cá nhân"
                  className={classes.textfield}
                />
              </FormControl>

              <br/><br/><br/>
              <FormControl>
                <TextField
                  required
                  id="current_org"
                  label="Số điện thoại liên lạc"
                  className={classes.textfield}
                />
              </FormControl>
              </Grid>
                <Grid item xs={7}>
                  <Typography variant="title">Giới thiệu về bản thân và kinh nghiệm</Typography>
                  <br/>
                  <TinyMCE
                      id="own_introduce"
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
}


StreamRegistrationMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StreamRegistrationMaster);
