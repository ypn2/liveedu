import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

/*import component*/
import ThemeContext from '../../../configs/context';
import CourseCurriculum from './components/CourseCurriculum';

import axios from 'axios';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textfield:{
    width:'100%'
  },

  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },

};

const names = [
  'Lập trình',
  'Ngoại ngữ',
  'Tiếng Anh',
  'Tiếng Trung',
  'Tiếng Nhật',
  'Thiết kế đồ họa',
  'Toán THPT',
  'Âm nhạc'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class CourseRegister extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      name: [],
    };

  }

  handleChange (event) {
    this.setState({ name: event.target.value });
  };

  fetchCuriculumn(data){
    console.log(data);
  }



  //Submit form
  submitRegisterdCourse(){
    axios.post('/api/course/registerd',{
      name:$('#course_name').val(),

    })
    .then(function(response){

    })
    .catch(function(err){

    });
  }


  render(){

    const { classes } = this.props;

    return(
      <ThemeContext.Consumer>
        {
          context=>
          <Card className={classes.card}>
           <CardContent>
             <Typography className={classes.title} color="textSecondary">
               {context.txt_input_control.course_reg.course_reg_header}
             </Typography>

            <div>
              <TextField
                required
                id="course_name"
                label={context.txt_input_control.course_reg.course_entry_name}
                margin="normal"
                className={classes.textfield}
              />
              <TextField
                required
                id="course_price"
                label="Giá khóa học"
                margin="normal"
                className={classes.textfield}
              />

              <TextField
                required
                id="lesson_price"
                label="Giá bài từng buổi học"
                margin="normal"
                className={classes.textfield}
              />

              <FormControl className={classes.textfield}>
                <InputLabel htmlFor="select-multiple-checkbox">{context.txt_input_control.course_reg.course_entry_field}</InputLabel>
                <Select
                  className={classes.textfield}
                  multiple
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => (
                   <div className={classes.chips}>
                     {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
                   </div>
                 )}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={this.state.name.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br/>
              <TextField
                 id="entry_course_desc"
                 label={context.txt_input_control.course_reg.course_entry_desc}
                 multiline
                 rows="4"
                 margin="normal"
                 className={classes.textfield}
               />
               <br/>
               <TextField
                 required
                 id="entry_course_name"
                 label={context.txt_input_control.course_reg.course_entry_video_url}
                 margin="normal"
                 className={classes.textfield}
               />
               <br/>
                <Typography variant="subheading" color="textSecondary" gutterBottom>
                  {context.txt_input_control.course_reg.course_header_curiculum}
                </Typography>
                <CourseCurriculum fetchData={this.fetchCuriculumn.bind(this)} />

            </div>
           </CardContent>
           <CardActions>
             <Button onClick={this.submitRegisterdCourse.bind(this)} variant="contained" size="small" color="primary">{context.txt_input_control.base.submit_reg}</Button>
           </CardActions>
         </Card>
        }
    </ThemeContext.Consumer>
    )
  }
}


CourseRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseRegister);
