import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {NavLink} from "react-router-dom";

const styles = {
  card: {
   maxWidth: 400,
 },
 media: {
   height: 0,
   paddingTop: '56.25%', // 16:9
 },
 actions: {
   display: 'flex',
 },
  content:{
    width:'100%',
    marginLeft:24,
    marginRight:24
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo:{
    width:80
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },

  polular:{
    background:"url('https://images.pexels.com/photos/583846/pexels-photo-583846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
    width:'100%',
    height:450,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSiz: "cover",
  },
  container:{
    width:1024,
    margin:'auto',
    paddingTop:30
  }

};

class HomeMaster extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      list:[1,1,1,1,1],
      listBlogs:[1,2,3]
    };
  }


  render(){

    const { classes } = this.props;
    const {list,listBlogs} = this.state;

    return(
      <div>
        <div className={classes.polular}>
          <div style={{width:'100%',height:'100%',background:'rgba(0,0,0,0.6)'}}>

            <div className={classes.container}>
              <Grid container>
                <Grid item xs={8}>
                  <iframe src="https://player.vimeo.com/video/132321680" width="100%" height="384" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                </Grid>
                <Grid item xs={4}>
                  <div style={{width:'100%',minHeight:'384px',background:'#fff',padding:15}}>
                    <div>
                      <Grid container>
                        <Grid item xs={3}>
                          <Avatar
                            alt="Adelle Charles"
                            src="https://v1-3-0.material-ui.com/static/images/uxceo-128.jpg"
                            className={classNames(classes.avatar, classes.bigAvatar)}
                          />
                        </Grid>
                        <Grid  item xs={9}>
                          <Typography variant="title" gutterBottom>Hoàng Huyền Anh</Typography>
                          <Typography variant="subheading" gutterBottom>Lập trình viên PHP</Typography>
                        </Grid>
                      </Grid>
                    </div>

                    <div style={{marginTop:15}}>
                      <Grid container>
                        <Grid item xs={3}>
                          <Typography variant="body1" gutterBottom>Khóa học</Typography>
                        </Grid>
                        <Grid  item xs={9}>
                          <Typography  gutterBottom>Lập trình reactjs cơ bản</Typography>
                          <Typography variant="caption" gutterBottom>
                            {`
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            `}
                          </Typography>
                        </Grid>
                      </Grid><br/>
                      <div>
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography variant="body1" gutterBottom>Bài 1</Typography>
                          </Grid>
                          <Grid  item xs={9}>
                            <Typography gutterBottom>Cài đặt môi trường lập trình</Typography>
                          </Grid>
                        </Grid>
                      </div>

                      <div>
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography variant="body1" gutterBottom>Thời gian</Typography>
                          </Grid>
                          <Grid  item xs={9}>
                            <Typography variant="caption" gutterBottom>90 phút</Typography>
                            <Typography variant="caption" gutterBottom>Bắt đầu: 20h</Typography>
                            <Typography variant="caption" gutterBottom>Kết thúc: 21h30</Typography>
                          </Grid>
                        </Grid>
                      </div>

                      <Divider style={{marginTop:15,marginBottom:15}} inset />
                      <div>
                        <NavLink to="/fr/channel"><Button style={{marginRight:15}} size="small" variant="contained" color="primary">Vào học</Button></NavLink>
                        <Button size="small" variant="contained" color="secondary">Mua khóa học</Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>

            </div>

          </div>
        </div>

        {/*dan*/}
        <div className={classes.container} style={{marginTop:24}}>

          <Typography variant="headline" gutterBottom align="center">Các khóa học đang mở</Typography>
          <Divider style={{marginBottom:24}}/>

          <Grid container spacing={24}>
            {
              list.map((node,key)=>{
                return(
                  <Grid item xs={3} key={key}>

                    <Card className={classes.card}>
                       <CardHeader
                         avatar={
                           <Avatar aria-label="Recipe" className={classes.avatar}

                             alt="Adelle Charles"
                             src="https://v1-3-0.material-ui.com/static/images/uxceo-128.jpg"

                             />

                         }
                         title="Hoàng Huyền Anh"
                         subheader="September 14, 2016"
                       />

                      <NavLink to="/fr/course_detail">
                         <CardMedia
                           className={classes.media}
                           image="https://material-ui.com/static/images/cards/paella.jpg"
                           title="Contemplative Reptile"
                         />
                     </NavLink>
                     <CardContent>
                       <Typography component="p">
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
                  </Grid>
                )
              })
            }
          </Grid>
        </div>


        <div className={classes.container} style={{marginTop:24}}>

          <Typography variant="headline" gutterBottom align="center">Bài viết tiêu biểu</Typography>
          <Divider style={{marginBottom:24}}/>

          <Grid container spacing={24}>
            {
              listBlogs.map((node,key)=>{
                return(
                  <Grid item xs={4} key={key}>

                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                          Lizard
                        </Typography>
                        <Typography component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                          across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      </div>
    )
  }
}

HomeMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeMaster);
