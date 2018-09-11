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

import ListNewCourse from './ListNewCourse';


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
    position: 'relative',
    right: 15,
    top: -8
  }
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
      tabValue:0,
      totalNewCouse:null,
    };
  }

  handleChange(event, value){
    this.setState({ tabValue:value });
  }

  countCourse(total){
    this.setState({
      totalNewCouse:total
    });
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
                <div>
                Đăng ký mới
                {
                    this.state.totalNewCouse != null ? (
                        <Badge className={classes.padding} color="secondary" badgeContent={this.state.totalNewCouse}/>
                    ):null
                  }
                </div>
              }
            />
            <Tab
              label={
                <div>
                    Đang diễn ra
                    <Badge className={classes.padding} color="primary" badgeContent={15}/>
                </div>
              }
            />
           <Tab
             label={
               <div>
                   Đã kết thúc
                   <Badge className={classes.padding} color="primary" badgeContent={15}/>
               </div>
             }
           />

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.tabValue}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer ><ListNewCourse updateCourseCouter = {this.countCourse.bind(this)}/></TabContainer>
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
