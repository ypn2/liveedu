import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SchoolIcon from '@material-ui/icons/School';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider  from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  chip:{
    height:20
  },
  badges:{
    fontSize:12,
    fontWeight:'normal',
    top:-5,
    left:5,
    position:'relative',
    color:'#fff',
    padding:'5px 7px'
  },
  badgesDeactive:{
    background:'rgb(255, 87, 34)'
  },
  badgesActive:{
    background:'rgb(66, 165, 245)'
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

const ITEM_HEIGHT = 48;


class CourseComponent extends React.Component{

  constructor(){
    super();

      this.state = {
        show:true,
        anchorEl: null,
      };
    }


    handleClick(event){
      this.setState({ anchorEl: event.currentTarget });
    }

    accepRegisteredCourse(course_id,user_id){

      const _self = this;


      axios.post('/api/dashboard/course/accept-registered-course',{
        course_id,
        user_id,
        state:1
      })
      .then(function(response){
        console.log(response.data);
        if(response.data.code == 200){
          _self.setState({
            show:false,
            anchorEl: null
          })

          setTimeout(function(){
              _self.props.removeMe(course_id);
          },500)

        }
      })
      .catch(function(err){
        console.log(err);
      });
    }


    handleClose(){
        this.setState({ anchorEl: null });
    }

    render(){
        const { classes ,theme ,object } = this.props;
        const { anchorEl,show } = this.state;
        const openMenu = Boolean(anchorEl);

      return(
        <Fade in={show} timeout={500}>

              <Card style={{display:'flex',borderRadius:0,padding:15,marginBottom:15}}>
                <div style={{width:180,height:140,background:'rgb(255, 87, 34)',textAlign:'center'}}>
                    <SchoolIcon style={{color:'rgba(0,0,0,0.55)',height:140,width:70}} />
                </div>
                <div style={{width:'100%',paddingLeft:15}}>
                  <div style={{height:140}}>
                    <div>
                      <h3 style={{marginTop:0,marginBottom:15,color:'#2C3E50'}}>
                        {object.name}
                        <span className={classNames(classes.badges,classes.badgesDeactive)}>mới gửi đăng ký</span>
                         <IconButton  onClick={this.handleClick.bind(this)} style={{float:'right',top:-10,right:5}}>
                          <MoreVertIcon />
                        </IconButton>
                      </h3>

                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={this.handleClose.bind(this)}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 120,
                          },
                        }}
                      >
                      <MenuItem onClick={this.accepRegisteredCourse.bind(this,object.id,object.user_id)}>Chấp nhận</MenuItem>
                      <MenuItem onClick={this.handleClose.bind(this)}>Từ chối</MenuItem>
                      <MenuItem onClick={this.handleClose.bind(this)}>Xem chi tiết</MenuItem>
                      </Menu>


                    </div>
                      <div>

                        <Chip
                          label="Lập trình"
                          className={classes.chip}
                          variant="outlined"
                        />

                        <Chip
                          label="Thiết kế đồ họa"
                          className={classes.chip}
                          variant="outlined"
                        />
                      </div>

                    <p style={{color:'#34495E',fontSize:15}}>{object.description}</p>
                  </div>
                  <Divider/>
                  <div>
                    <ListItem>
                      <Avatar src="https://material-ui.com/static/images/remy.jpg"/>
                      <ListItemText primary={<h4 style={{fontWeight:500,margin:0}}><a href="#" style={{color:'#42a5f5'}} >{object.partner_name}</a></h4>} secondary={<label style={{color:'rgba(0,0,0,0.8)'}}>{object.partner_current_job}</label>} />
                    </ListItem>
                  </div>
                </div>
              </Card>
          </Fade>
      )

    }
}

CourseComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles,{ withTheme: true })(CourseComponent);
