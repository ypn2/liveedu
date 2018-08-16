import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import {NavLink} from "react-router-dom";


const styles = {
  root_list:{
    width:'100%'
  },
  lession_heading:{
    color:'#2C3E50',
    fontSize:16
  },
  list_item:{
    marginBottom:5
  }
}

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class TraineeScheduleMaster extends React.Component{

  render(){

    const {classes} = this.props;

    return(
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Khóa học lập trình React cơ bản</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List dense="true" className={classes.root_list}>
              {generate(
                  <ListItem className={classes.list_item}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="title" className={classes.lession_heading}>Bài 1</Typography>}
                      secondary='Giới thiệu react và cài đặt môi trường'
                    />

                    <ListItemSecondaryAction>
                        <NavLink to="/fr/channel"><Typography variant="caption" style={{color:'red'}}>đang trực tiếp</Typography></NavLink>
                    </ListItemSecondaryAction>
                  </ListItem>
                  ,
              )}
            </List>

          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Khóa học lập trình Laravel cơ bản</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List dense="true" className={classes.root_list}>
              {generate(
                <ListItem className={classes.list_item}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="title" className={classes.lession_heading}>Bài 1</Typography>}
                    secondary='Giới thiệu react và cài đặt môi trường'
                  />

                  <ListItemSecondaryAction>
                      <Typography variant="caption" style={{color:'green'}}>bắt đầu 20h:30 20/5/2018</Typography>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

TraineeScheduleMaster.PropTypes = {
  classes:PropTypes.object.isRequired,
};

export default withStyles(styles)(TraineeScheduleMaster);
