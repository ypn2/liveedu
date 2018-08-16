import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {Link,NavLink} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';

const styles = {
  container:{
    width:1220,
    marginTop:24,
    margin:'auto'
  },
  card: {
    maxWidth: '100%',
    marginBottom:24
  },
  media: {
    height: 100,
    width:'100%',
    maxHeight:100,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  post_title:{
    color:'#2C3E50',
    marginBottom:15
  }
};

class BlogMaster extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      list:[1,2,3,4,5]
    }
  }

  render(){
    const {classes} = this.props;
    const {list} = this.state;
    return(
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item  xs={2}>

          </Grid>
          <Grid item  xs={7}>
            {
              list.map((node,key)=>{
                return(
                  <Card className={classes.card}>
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
                    <div>
                      <Link to="/fr/p"><img style={{width:'100%',height:180,objectFit:'cover'}} src="https://images.pexels.com/photos/583846/pexels-photo-583846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" /></Link>
                    </div>
                    <CardContent>
                      <Link to="/fr/p"><Typography variant="title" className={classes.post_title}>Tại sao mây lại màu trắng?</Typography></Link>
                      <Typography component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with
                        your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                      <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="Share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                )
              })
            }

          </Grid>

          <Grid item  xs={3}>
            <Card style={{marginBottom:24}}>
              <Typography style={{margin:10,color:'#99A3AD'}} variant="subheading">Bài viết của tháng</Typography>
              <Divider />
            <List>
              <ListItem>
                <ListItemText
                  primary={<a href="#" style={{margin:0,fontSize:13,color:"#2FB5FA"}}>Tại sao mây có màu trắng? tại sao, tại sao?</a>}
                  secondary={
                    <div>Đăng bởi <a style={{color:'#2FB5FA'}} href="#">huyền anh</a> 22 tháng 7</div>
                  }/>
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={<p style={{margin:0,fontSize:13}}>Tại sao mây có màu trắng? tại sao, tại sao?</p>}
                  secondary={
                    <div>Đăng bởi <a style={{color:'#2FB5FA'}} href="#">huyền anh</a> 22 tháng 7</div>
                  }/>
              </ListItem>

            </List>
            </Card>

            <Card>
              <Typography style={{margin:10,color:'#99A3AD'}} variant="subheading">Đề xuất cho bạn</Typography>
              <Divider />
            <List>
              <ListItem>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <Typography style={{marginLeft:5}} component="p">
                  <a href="#" style={{color:'#2c3e50'}} ><i>Tại sao mây có màu trắng</i></a>
                </Typography>
              </ListItem>
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
              </ListItem>
            </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

BlogMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogMaster);
