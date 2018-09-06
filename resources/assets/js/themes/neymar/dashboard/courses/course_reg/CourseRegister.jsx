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
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Route, Redirect } from 'react-router';

/*import component*/
import ThemeContext from '../../../configs/context';
import CourseCurriculum from './components/CourseCurriculum';

import axios from 'axios';

var ChuSo=new Array(" không "," một "," hai "," ba "," bốn "," năm "," sáu "," bảy "," tám "," chín ");
var Tien=new Array( "", " ngàn", " triệu", " tỷ", " ngàn tỷ", " triệu tỷ");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso)
{
    var tram;
    var chuc;
    var donvi;
    var KetQua="";
    tram=parseInt(baso/100);
    chuc=parseInt((baso%100)/10);
    donvi=baso%10;
    if(tram==0 && chuc==0 && donvi==0) return "";
    if(tram!=0)
    {
        KetQua += ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1))
    {
            KetQua += ChuSo[chuc] + " mươi";
            if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi)
    {
        case 1:
            if ((chuc != 0) && (chuc != 1))
            {
                KetQua += " mốt ";
            }
            else
            {
                KetQua += ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0)
            {
                KetQua += ChuSo[donvi];
            }
            else
            {
                KetQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0)
            {
                KetQua += ChuSo[donvi];
            }
            break;
        }
    return KetQua;
}

//2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)

function DocTienBangChu(SoTien)
{
    var lan=0;
    var i=0;
    var so=0;
    var KetQua="";
    var tmp="";
    var ViTri = new Array();
    if(SoTien<0) return "Số tiền âm !";
    if(SoTien==0) return "Không đồng !";
    if(SoTien>0)
    {
        so=SoTien;
    }
    else
    {
        so = -SoTien;
    }
    if (SoTien > 100000000)
    {
        //SoTien = 0;
        return "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if(isNaN(ViTri[5]))
        ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
     if(isNaN(ViTri[4]))
        ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
     if(isNaN(ViTri[3]))
        ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
     if(isNaN(ViTri[2]))
        ViTri[2] = "0";
    ViTri[1] = parseInt((so % 1000000) / 1000);
     if(isNaN(ViTri[1]))
        ViTri[1] = "0";
    ViTri[0] = parseInt(so % 1000);
  if(isNaN(ViTri[0]))
        ViTri[0] = "0";
    if (ViTri[5] > 0)
    {
        lan = 5;
    }
    else if (ViTri[4] > 0)
    {
        lan = 4;
    }
    else if (ViTri[3] > 0)
    {
        lan = 3;
    }
    else if (ViTri[2] > 0)
    {
        lan = 2;
    }
    else if (ViTri[1] > 0)
    {
        lan = 1;
    }
    else
    {
        lan = 0;
    }
    for (i = lan; i >= 0; i--)
    {
       tmp = DocSo3ChuSo(ViTri[i]);
       KetQua += tmp;
       if (ViTri[i] > 0) KetQua += Tien[i];
       if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
    }
   if (KetQua.substring(KetQua.length - 1) == ',')
   {
        KetQua = KetQua.substring(0, KetQua.length - 1);
   }
   KetQua = KetQua.substring(1,2).toUpperCase()+ KetQua.substring(2);
   return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


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

var curriculumn='';

const _dfState = {
  status:false,
  message:''
}

class CourseRegister extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      error_name:_dfState,
      error_course_price:_dfState,
      error_lesson_price:_dfState,
      error_fields:_dfState,
      error_course_desc:_dfState,
      error_course_target:_dfState,
      error_course_pre_required:_dfState,
      error_curriculumn:_dfState,


      name: [],
      course_price_number:0,
      course_price_text:'Không',
      course_lesson_number:0,
      course_lesson_text:'Không',

      redirect:false
    };

  }

  handleChange (event) {
    this.setState({ name: event.target.value });
  };

  fetchCuriculumn(data){
    curriculumn = data;
  }

  resetState(){
    this.setState({
      error_name:_dfState,
      error_course_price:_dfState,
      error_lesson_price:_dfState,
      error_fields:_dfState,
      error_course_desc:_dfState,
      error_course_target:_dfState,
      error_course_pre_required:_dfState,
      error_curriculumn:_dfState,
    });
  }

  //Submit form
  submitRegisterdCourse(){
    this.resetState();

    axios.post('/api/course/registered',{
      name:$('#course_name').val(),
      course_price:$('#course_price').val(),
      lesson_price:$('#lesson_price').val(),
      fields:this.state.name,
      course_desc:$("#course_desc").val(),
      course_target:$('#course_target').val(),
      pre_required:$('#pre_required').val(),
      video_introdue_url:$('#video_introdue_url').val(),
      curriculumn
    })
    .then(function(response){
      if(response.data.code == 200){
        this.setState({
          redirect:true
        })
      }
      else if(response.data.code == 300){
        var _mess = response.data.message;

        if('name' in _mess){
          this.setState({
            error_name:{
              status:true,
              message:_mess.name
            }
          });
        }

        if('course_price' in _mess){
          this.setState({
            error_course_price:{
              status:true,
              message:_mess.course_price
            }
          });
        }

        if('lesson_price' in _mess){
          this.setState({
            error_lesson_price:{
              status:true,
              message:_mess.lesson_price
            }
          });
        }

        if('course_desc' in _mess){
          this.setState({
            error_course_desc:{
              status:true,
              message:_mess.course_desc
            }
          });
        }

        if('course_target' in _mess){
          this.setState({
            error_course_target:{
              status:true,
              message:_mess.course_target
            }
          });
        }


        if('pre_required' in _mess){
          this.setState({
            error_pre_requiredt:{
              status:true,
              message:_mess.pre_required
            }
          });
        }

      }
      else{
        alert('lỗi chưa xác định');
      }


    }.bind(this))
    .catch(function(err){
      console.log(err);
    });
  }

  onValueChange(event){
    const amount = event.target.value;

    this.setState({
      course_price_text:DocTienBangChu(amount),
      course_price_number:numberWithCommas(amount)
    })
  }

  onLessonPriceChange(event){
    const amount = event.target.value;
    this.setState({
      course_lesson_text:DocTienBangChu(amount),
      course_lesson_number:numberWithCommas(amount)
    })
  }


  render(){

    if(this.state.redirect){
      return <Redirect to='trainer-management/course/list'/>;
    }

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

            <FormControl className={classes.textfield} error={this.state.error_name.status ? true : false}>
               <InputLabel htmlFor="course_name">{context.txt_input_control.course_reg.course_entry_name}</InputLabel>
               <Input
                 required
                 id="course_name"
                 type="text"
                 name="reg_first_name"
               />
             {
               this.state.error_name.status ? (
                 <FormHelperText>{this.state.error_name.message}</FormHelperText>
               ):null
             }

            </FormControl><br/><br/>

          <table>
            <tbody>
            <tr>
              <td>

                <FormControl className={classes.textfield} error={this.state.error_course_price.status ? true : false}>
                     <InputLabel htmlFor="course_price">Giá cả khóa học</InputLabel>
                     <Input
                       required
                       id="course_price"
                       style={{width:300}}
                       type="number"
                       onChange = {this.onValueChange.bind(this)}
                       endAdornment={
                         <InputAdornment position="end">
                          Đồng
                         </InputAdornment>
                       }
                     />
                   {
                     this.state.error_course_price.status ? (
                       <FormHelperText>{this.state.error_course_price.message}</FormHelperText>
                     ):null
                   }

                  </FormControl>

              </td>

              <td>

                <label>Định dạng: </label>&nbsp;<span style={{color:'red',fontWeight:'bold'}}>{this.state.course_price_number}</span>&nbsp;đồng | <label>Bằng chữ:</label>&nbsp;<span style={{color:'green',fontWeight:'bold'}}>{this.state.course_price_text}</span>&nbsp;đồng

              </td>
            </tr>

            <tr>
              <td>

                <FormControl className={classes.textfield} error={this.state.error_lesson_price.status ? true : false}>
                     <InputLabel htmlFor="lesson_price">Giá từng buổi học</InputLabel>
                     <Input
                       required
                       id="lesson_price"
                       style={{width:300}}
                       type="number"
                       onChange = {this.onLessonPriceChange.bind(this)}
                       endAdornment={
                         <InputAdornment position="end">
                          Đồng
                         </InputAdornment>
                       }
                     />
                   {
                     this.state.error_lesson_price.status ? (
                       <FormHelperText>{this.state.error_lesson_price.message}</FormHelperText>
                     ):null
                   }

                  </FormControl>

              </td>

              <td>

                <label>Định dạng: </label>&nbsp;<span style={{color:'red',fontWeight:'bold'}}>{this.state.course_lesson_number}</span>&nbsp;đồng | <label>Bằng chữ:</label>&nbsp;<span style={{color:'green',fontWeight:'bold'}}>{this.state.course_lesson_text}</span>&nbsp;đồng

              </td>
            </tr>
            </tbody>
          </table>


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
                 id="course_desc"
                 required
                 label={context.txt_input_control.course_reg.course_entry_desc}
                 multiline
                 rows="4"
                 margin="normal"
                 className={classes.textfield}
               />
               <br/>

               <TextField
                  id="course_target"
                  label="Mục tiêu của khóa học"
                  required
                  multiline
                  rows="4"
                  margin="normal"
                  className={classes.textfield}
                />
                <br/>

                <TextField
                   id="pre_required"
                   required
                   label="Yêu cầu học viên"
                   multiline
                   rows="4"
                   margin="normal"
                   className={classes.textfield}
                 />
                 <br/>

               <TextField
                 id="video_introdue_url"
                 label={context.txt_input_control.course_reg.course_entry_video_url}
                 margin="normal"
                 className={classes.textfield}
               />
             <br/><br/>
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
