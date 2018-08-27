import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Selections from './Selections';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  noneborder:{
    borderRadius:0,
    marginBottom:15
  }
});

class PartnerRegistered extends React.Component {

  constructor(){
    super();

    this.state = {
      listRegistered:[]
    }
  }

  componentWillMount(){
    axios.post('/api/partner/list-registered')
    .then(function(response){
        if(response.data.code == 200){
          this.setState({
            listRegistered:response.data.data
          })
        }
    }.bind(this))
    .catch(function(err){

    });
  }

  render(){

    const { classes } = this.props;
    const {listRegistered} = this.state;
    return (
      <div className={classes.root}>

        <Paper className={classes.noneborder} style={{padding:'10px 5px'}} elevation={1}>
          <Typography variant="title" style={{color:'rgba(0,0,0,0.8)'}}>
            Danh sách đăng ký streammer partner
          </Typography>
        </Paper>

        <Paper className={classes.noneborder} elevation={1}>
          <List>
            {
              listRegistered.map(partner=>{
                return(
                  <div key = {partner.partner_id}>
                    <ListItem>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText primary={partner.name} secondary={partner.current_job} />
                      <ListItemSecondaryAction>
                        <ListItemSecondaryAction>
                          <Selections partnerId = { partner.partner_id } />
                        </ListItemSecondaryAction>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                  </div>
                )
              })
            }
          </List>
        </Paper>
      </div>
    );


  }
}

PartnerRegistered.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerRegistered)
