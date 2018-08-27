/*import libs*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import LocalOffer from '@material-ui/icons/LocalOffer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import {NavLink} from "react-router-dom";

/*import components*/
import ThemeContext from '../configs/context';
import route from '../configs/route';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },

  navlink:{
    textDecoration:'none',
    padding:'0px!important'
  }
});

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      submenu:{
        is_open_streammer_partner:false,
      }
    };
  }

  handleClick (param)  {
    this.setState(state => (
      {
        submenu:{
          [param]:!this.state.submenu[param]
        }
      }
    ));
  }

  render() {
    const { classes } = this.props;
    return (
          <div className={classes.root}>
            <Typography variant="caption" style={{padding:15,background:'#b1b1b159'}}>Quản lý</Typography>
            <List component="nav">
              {/*Menu quản lý streammer partner */}
              <ListItem button onClick={this.handleClick.bind(this,"is_open_streammer_partner")} >
                <ListItemIcon>
                    <LocalOffer />
                </ListItemIcon>
                <ListItemText inset primary="Streammer partner" />
                {this.state.submenu.is_open_streammer_partner ? <ExpandLess /> : <ExpandMore />}  
              </ListItem>

              <Collapse in={this.state.submenu.is_open_streammer_partner} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <NavLink className={classes.navlink} to='/personalize/streammer-partner/registered-list'>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText inset primary="Danh sách đăng ký" />
                    </ListItem>
                  </NavLink>

                  <NavLink className={classes.navlink} to='/personalize/strammer-partner/active-list'>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText inset primary="Đang hoạt động" />
                    </ListItem>
                  </NavLink>

                </List>
              </Collapse>

            </List>

          </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
