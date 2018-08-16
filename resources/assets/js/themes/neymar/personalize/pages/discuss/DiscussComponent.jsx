import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

const styles = theme =>({
  root:{
    borderRadius:0,
    padding:15
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  reply_content:{
    paddingLeft:15
  },
  reply_post:{
    borderLeft:'3px solid #ffa500a8',
    paddingLeft:30
  }
});

class DiscussComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {

      expanded: false ,
      listReply:[1,1,1,1,1,1]
    };
  }


  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render(){

    const {classes} = this.props;

      return(
        <Paper className={classes.root} elevation={1}>
            <div className={classes.post}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardContent>
                <Typography component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with
                  your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                      <ExpandLessIcon />
                    </IconButton><span style={{color:'green',fontSize:14}}>15</span>
                    <IconButton aria-label="Share">
                      <ExpandMoreIcon />
                    </IconButton><span style={{color:'red',fontSize:14}}>15</span>
                    <IconButton
                      className={classNames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
                      })}
                      onClick={this.handleExpandClick.bind(this)}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <QuestionAnswer /><span style={{color:'#ddd',fontSize:14}}>15</span>
                  </IconButton>
              </CardActions>

              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="caption" style={{marginBottom:15}}>50 Trả lời</Typography>
                  {
                    this.state.listReply.map((node,key)=>{
                      return(
                        <div className={classes.reply_post}>
                          <div>
                            <CardHeader
                              avatar={
                                <Avatar src="https://material-ui.com/static/images/remy.jpg" aria-label="Recipe" className={classes.avatar}/>
                              }
                              action={
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                              title="Shrimp and Chorizo Paella"
                              subheader="September 14, 2016"
                            />

                            <Typography className={classes.reply_content} component="p">
                              This impressive paella is a perfect party dish and a fun meal to cook together with
                              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>

                            <CardActions className={classes.actions} disableActionSpacing>
                                  <IconButton aria-label="Add to favorites">
                                    <ExpandLessIcon />
                                  </IconButton><span style={{color:'green',fontSize:14}}>15</span>
                                  <IconButton aria-label="Share">
                                    <ExpandMoreIcon />
                                  </IconButton><span style={{color:'red',fontSize:14}}>15</span>
                                  <IconButton
                                    className={classNames(classes.expand, {
                                      [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick.bind(this)}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                  >
                                </IconButton>
                            </CardActions>

                          </div>

                        </div>
                      )
                    })
                  }
                </CardContent>
              </Collapse>

              <Divider/>
            </div>

            <div className={classes.post}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardContent>
                <Typography component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with
                  your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
              </CardContent>
            </div>
        </Paper>
      )
  }
}

DiscussComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DiscussComponent);
