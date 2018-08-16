import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const styles = theme =>({
  root: {
     flexGrow: 1,
   },
   textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
  },
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  row: {
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    top:-55
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});


class Profile extends React.Component{

  render(){

    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={3}>
            <Card className={classes.card + ' col-md-3'}>
              <CardMedia
                className={classes.media}
                image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              >
              <div className={classes.row}>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/uxceo-128.jpg" className={classNames(classes.avatar, classes.bigAvatar)} />
              </div>
            </CardMedia>
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
          <Grid item xs={9}>
            <div>
              <Typography variant="title" gutterBottom>
                Thông tin cá nhân
              </Typography>
              <div>
                <TextField
                  required
                  id="required"
                  label="Họ tên"
                  defaultValue="Phạm Như Ý"
                  className={classes.textField}
                  margin="normal"
                /><br/>
                <TextField
                  required
                  id="required"
                  label="Số điện thoại"
                  defaultValue="01289341568"
                  className={classes.textField}
                  margin="normal"
                /><br/>
                <TextField
                  required
                  id="required"
                  label="facebook cá nhân"
                  defaultValue="https://www.facebook.com/100013165274660"
                  className={classes.textField}
                  margin="normal"
                /><br/>
                <TextField
                  required
                  id="required"
                  label="Công việc hiện tại"
                  defaultValue="Lập trình viên"
                  className={classes.textField}
                  margin="normal"
                /><br/>
                <TextField
                  required
                  id="required"
                  label="Đơn vị công tác hiện tại"
                  defaultValue="Microsoft INC"
                  className={classes.textField}
                  margin="normal"
                /><br/><br/><br/>
              </div>

              <div>
                <section className="timeline-outer">
                  <Typography variant="title" gutterBottom>
                    Hồ sơ công tác
                  </Typography>
                  <div id="content">
                    <div>
                      <div>
                        <ul className="timeline-job">
                          <li className="event" data-date="2015/Present">
                            <h3>Management and Entreprenurship (MSc)</h3>
                            <p>
                              This September 2015 I will begin an MSc in Management and Entrepreneurship at University of Sussex, to broaden my knowledge and gain skills necessary for my future in business and management.
                            </p>
                          </li>
                          <li className="event" data-date="2015/Present">
                            <h3>Claromentis</h3>
                            <p>
                              Claromentis is an intranet software provider company. I started working at the Brighton office as a Marketing Designer while I was still attending my final year at the University of Sussex. My primary responsibilities included creating corporate identity
                              for the company; I re-designed their website, and have created marketing materials such as brochures.
                            </p>
                            <p>Since graduating from univerve provided the perfect opportunity to implement the skills I have gained throughout my higher
                              educatio, as well as experiencing the running of a successful business.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <a className="portfolio-link"  href="http://www.erpik.com"><h6>www.erpik.com</h6></a>
                <br/>
              </div>


            </div>
          </Grid>
        </Grid>


      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
