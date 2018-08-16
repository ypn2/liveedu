import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  container:{
    width:1220,
    marginTop:24,
    margin:'auto'
  },
  avatar:{
    background:'red'
  },
  post_title:{
    color:'#2C3E50',
    fontWeight:'500',
    marginBottom:15
  },
  post_content:{
    marginTop:15,
    fontSize:18
  },

  comment:{
    marginTop:15
  }

}

class PostMaster extends React.Component{
  render(){

    const {classes} = this.props;

    return(
      <div className={classes.container}>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={9}>

              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />

            <Typography variant="headline" className={classes.post_title}>
              Tại sao mây có màu trắng?
            </Typography>

            <img style={{width:'100%',height:350,objectFit:'cover'}} src="https://images.pexels.com/photos/583846/pexels-photo-583846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />

            <Typography gutterBottom className={classes.post_content}>
              Những nhận định này là đúng, nhưng những người nói về những điều này đừng nghĩ bản thân là công bằng,
              bình đẳng và nghiêm minh và được quyền đứng trên cao nhìn xuống chê trách.
              Ngược lại, mỗi người trong chúng ta là những cá thể vô cùng cảm tính,
               những cá thể vô cùng cảm tính này lại tập hợp thành một xã hội cảm tính,
               và hiện trạng như mọi người nhắc tới chỉ là điều tất yếu, một hiện trạng mà ai cũng "có công đóng góp" vào cả.
            </Typography>


            </Grid>
          </Grid>
        </div>

        {/*comment*/}
        <div className={classes.comment}>
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <Typography variant="title">
                Bình luận
              </Typography>
              <div className="comment_item">
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />

                <div style={{marginLeft:80}}>
                  <Typography>
                    Nội dung bản quyền thuộc về Spiderum.com, liên hệ với admin để được sao chép!
                  </Typography>
                  <div>
                    <IconButton aria-label="Delete">
                      <ExpandLessIcon />
                    </IconButton><span style={{color:'green',fontSize:14}}>15</span>
                    <IconButton aria-label="Delete">
                      <ExpandMoreIcon/>
                    </IconButton><span style={{color:'red',fontSize:14}}>15</span>

                  </div>
                </div>

              </div>

              <div className="comment_item">
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      I
                    </Avatar>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <div style={{marginLeft:80}}>
                  <Typography>
                    Nội dung bản quyền thuộc về Spiderum.com, liên hệ với admin để được sao chép!
                  </Typography>
                  <div>
                    <IconButton aria-label="Delete">
                      <ExpandLessIcon />
                    </IconButton><span style={{color:'green',fontSize:14}}>15</span>
                    <IconButton aria-label="Delete">
                      <ExpandMoreIcon/>
                    </IconButton><span style={{color:'red',fontSize:14}}>15</span>

                  </div>
                </div>
              </div>

              <div className="comment_item">
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      P
                    </Avatar>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />

                <div style={{marginLeft:80}}>
                  <Typography>
                    Nội dung bản quyền thuộc về Spiderum.com, liên hệ với admin để được sao chép!
                  </Typography>
                  <div>
                    <IconButton aria-label="Delete">
                      <ExpandLessIcon />
                    </IconButton><span style={{color:'green',fontSize:14}}>15</span>
                    <IconButton aria-label="Delete">
                      <ExpandMoreIcon/>
                    </IconButton><span style={{color:'red',fontSize:14}}>15</span>

                  </div>
                </div>

              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

PostMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostMaster);
