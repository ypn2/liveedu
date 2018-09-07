import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import SchoolIcon from '@material-ui/icons/School';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider  from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Badge from '@material-ui/core/Badge';


import CourseComponent from './CourseComponent';


import ImageIcon from '@material-ui/icons/Image';

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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class CourseList extends React.Component {

  constructor(){
    super();
    this.state = {
      tabValue:0
    };
  }

  handleChange(event, value){
    this.setState({ tabValue:value });
  }


  render() {
    const { classes ,theme  } = this.props;
    const { tabValue } = this.state;

    return (
      <div className={classes.root}>

        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChange.bind(this)}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
           <Tab
              label={
                <Badge className={classes.padding} color="secondary" badgeContent={4}>
                  Đăng ký mới
                </Badge>
              }
            />
            <Tab
              label={
                <Badge className={classes.padding} color="primary" badgeContent={15}>
                  Đang diễn ra
                </Badge>
              }
            />
           <Tab
             label={
               <Badge className={classes.padding} color="error" badgeContent={20}>
                 Đã kết thúc
               </Badge>
             }
           />

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.tabValue}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer >
            <div className={classes.demo}>

              <CourseComponent/>


              <Card style={{display:'flex',borderRadius:0,padding:15}}>
                <div style={{width:180,height:140,background:'rgb(255, 87, 34)',textAlign:'center'}}>
                    <SchoolIcon style={{color:'rgba(0,0,0,0.55)',height:140,width:70}} />
                </div>
                <div style={{width:'100%',paddingLeft:15}}>
                  <div style={{height:140}}>
                    <h3 style={{marginTop:0,marginBottom:15,color:'#2C3E50'}}>Github Webhooks for Beginners <span  className={classNames(classes.badges,classes.badgesActive)}>sẵn sàng mở lớp</span></h3>

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

                    <p style={{color:'#34495E',fontSize:15}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda aut debitis, ducimus, ea eaque earum eius enim eos explicabo facilis harum impedit natus nemo, nobis obcaecati omnis perspiciatis praesentium quaerat quas quod reprehenderit sapiente temporibus vel voluptatem voluptates voluptatibus?</p>
                  </div>
                  <Divider/>
                  <div style={{paddingTop:15}}>
                    <label>Trạng thái:</label><span style={{color:'green'}}><b>Sẵn sàng</b></span>
                  </div>
                </div>
              </Card>
            </div>

          </TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>

    );
  }
}

CourseList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles,{ withTheme: true })(CourseList);
