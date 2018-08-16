import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

/*import components*/
import Schedule from '../../../custom-components/schedule/Schedule';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formControl: {
    margin: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },

});

class ClassRegister extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      age: '',
      name: 'hai',
    };
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  render(){

    const {classes} = this.props;

    return(
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Đăng ký lớp học mới
          </Typography>

          <div>
            <FormControl className={classes.formControl + ' text-field-control'}>
              <InputLabel htmlFor="age-simple">Chọn khóa học</InputLabel>
              <Select
                value={this.state.age}
                onChange={this.handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value="">
                  <em>Danh sách khóa học đã đăng ký</em>
                </MenuItem>
                <MenuItem value={10}>Lập trình react căn bản</MenuItem>
                <MenuItem value={20}>Thành thạo Photoshop CS6 trong 30 ngày</MenuItem>
                <MenuItem value={30}>Javascript nâng cao</MenuItem>
              </Select>
            </FormControl>
            <br/><br/>
            <Typography variant="subheading">
               Khung giờ học
            </Typography>
            <Schedule/>
          </div>

        </Paper>
      </div>
    )
  }
}

ClassRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassRegister);
