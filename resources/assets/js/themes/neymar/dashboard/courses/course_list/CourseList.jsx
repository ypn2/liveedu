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
import IconButton from '@material-ui/core/IconButton';
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
  }
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class CourseList extends React.Component {

  constructor(){
    super();
    this.state = {
      dense: false,
      secondary: false,
    };
  }


  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>

        <Typography variant="title" className={classes.title}>
          Danh sách khóa học
        </Typography>
        <div className={classes.demo}>
          <Card style={{display:'flex',borderRadius:0,padding:15,marginBottom:15}}>
            <div style={{width:180,height:140,background:'#42a5f5',textAlign:'center'}}>
                <SchoolIcon style={{color:'rgba(0,0,0,0.55)',height:140,width:70}} />
            </div>
            <div style={{width:'100%',paddingLeft:15}}>
              <div style={{height:140}}>
                <h3 style={{marginTop:0,marginBottom:15,color:'#2C3E50'}}>Github Webhooks for Beginners</h3>

                  <div>

                    <Chip
                      label="Lập trình"
                      className={classes.chip}
                      variant="outlined"
                    />

                    <Chip
                      label="Thiết kế đồ họa"
                      className={classes.chip}
                      variant="outlined"
                    />
                  </div>

                <p style={{color:'#34495E',fontSize:15}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda aut debitis, ducimus, ea eaque earum eius enim eos explicabo facilis harum impedit natus nemo, nobis obcaecati omnis perspiciatis praesentium quaerat quas quod reprehenderit sapiente temporibus vel voluptatem voluptates voluptatibus?</p>
              </div>
              <Divider/>
              <div style={{paddingTop:15}}>
                <label>Trạng thái:</label><span style={{color:'orange'}}><b>Đang chờ phê duyệt</b></span>
              </div>
            </div>
          </Card>

          <Card style={{display:'flex',borderRadius:0,padding:15}}>
            <div style={{width:180,height:140,background:'rgb(255, 87, 34)',textAlign:'center'}}>
                <SchoolIcon style={{color:'rgba(0,0,0,0.55)',height:140,width:70}} />
            </div>
            <div style={{width:'100%',paddingLeft:15}}>
              <div style={{height:140}}>
                <h3 style={{marginTop:0,marginBottom:15,color:'#2C3E50'}}>Github Webhooks for Beginners</h3>

                  <div>

                    <Chip
                      label="Lập trình"
                      className={classes.chip}
                      variant="outlined"
                    />

                    <Chip
                      label="Thiết kế đồ họa"
                      className={classes.chip}
                      variant="outlined"
                    />
                  </div>

                <p style={{color:'#34495E',fontSize:15}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda aut debitis, ducimus, ea eaque earum eius enim eos explicabo facilis harum impedit natus nemo, nobis obcaecati omnis perspiciatis praesentium quaerat quas quod reprehenderit sapiente temporibus vel voluptatem voluptates voluptatibus?</p>
              </div>
              <Divider/>
              <div style={{paddingTop:15}}>
                <label>Trạng thái:</label><span style={{color:'green'}}><b>Đã được mở lớp</b></span>
              </div>
            </div>
          </Card>


        </div>
      </div>
    );
  }
}

CourseList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseList);
