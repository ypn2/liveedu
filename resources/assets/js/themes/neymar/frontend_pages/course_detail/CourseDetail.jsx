import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {NavLink} from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = {
  container:{
    width:1220,
    marginTop:48,
    margin:'auto',
  },
  wall_background:{
    background:"url('https://images.pexels.com/photos/583846/pexels-photo-583846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
    width:'100%',
    height:250,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSiz: "cover",
  },
  name_course:{
    position:'absolute',
    maxWidth:700,
    bottom:30,
    left:48,
    color:'rgba(255,255,255,0.9)'
  },
  card_trainer:{
    width:300,
    position:'absolute',
    right:40,
    bottom:-45,
    padding:5
  },
  card_trainer_media:{
    minHeight:160
  },
  card_trainer_header:{
    position:'absolute',
    bottom:47,
    color:'#fff!important'
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  root_paper:{
    padding:15,
    borderRadius:0,
    maxWidth:900,
    marginBottom:15
  }
}

class CourseDetail extends React.Component{

  render(){

    const {classes} = this.props;

    return(
      <div>
        <div className={classes.wall_background}>
          <div style={{width:'100%',height:'100%',background:'rgba(0,0,0,0.6)',position:'relative'}}>
            <Typography variant="display1" className={classes.name_course}>
              Học photoshop một cách bài bản để trở thành nhà thiết kế chuyên nghiệp
            </Typography>

            <Card className={classes.card_trainer}>
              <CardMedia
                className={classes.card_trainer_media}
                image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              >
              <CardHeader
                className={classes.card_trainer_header}
                avatar={
                  <Avatar aria-label="Recipe" className={classes.bigAvatar}
                    alt="Adelle Charles"
                    src="https://v1-3-0.material-ui.com/static/images/uxceo-128.jpg"

                    />

                }
                title={<Typography variant="subheading" style={{color:'#fff',textDecoration:'underline'}}>@Hoàng Huyền Anh</Typography>}
              />
            </CardMedia>
              <CardActions style={{marginTop:30}}>
                <Button variant="contained" size="small" color="primary">
                  theo dõi
                </Button>
              </CardActions>
          </Card>

          </div>
        </div>
        <div className={classes.container}>
          <Paper className={classes.root_paper}>
            <Typography variant="title" component="h3">
              Trạng thái khóa học
            </Typography>
            <Typography component="p">
              Đang mở
            </Typography>
          </Paper>
          <div>
            <Paper className={classes.root_paper}>
              <Typography variant="title" component="h3">
                Tổng quan
              </Typography>
              <Typography component="p">
                <iframe>

                </iframe>
              </Typography>
            </Paper>

            <Paper className={classes.root_paper}>
              <Typography variant="title" component="h3">
                Lợi ích khóa học
              </Typography>
              <div className={classes.course_benefit}>
              </div>
            </Paper>

            <Paper className={classes.root_paper}>
              <Typography variant="title" component="h3">
                Đối tượng mục tiêu
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your application.
              </Typography>
            </Paper>

            <Paper className={classes.root_paper}>
              <Typography variant="title" component="h3">
                Giáo trình
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your application.
              </Typography>
            </Paper>

            <Paper className={classes.root_paper}>
              <Typography variant="title" component="h3">
                Hồ sơ giảng viên
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your application.
              </Typography>
            </Paper>

            <Paper className={classes.root_paper}>
              <Typography variant="title" component="h3">
                Yêu cầu khóa học
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your application.
              </Typography>
            </Paper>

          </div>
        </div>
      </div>
    )
  }
}

CourseDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseDetail);
