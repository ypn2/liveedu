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

class CourseRegister extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      name: [],
      course_price_number:0,
      course_price_text:'Không',
      course_lesson_number:0,
      course_lesson_text:'Không'
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
              <div>
              <TextField
                required
                id="course_price"
                label="Giá khóa học"
                type="number"
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="start">Đồng</InputAdornment>,
                }}
                style={{width:300}}
                onChange = {this.onValueChange.bind(this)}
              />		&nbsp;	&nbsp;	&nbsp;

              <label>Định dạng: </label>&nbsp;<span style={{color:'red',fontWeight:'bold'}}>{this.state.course_price_number}</span>&nbsp;đồng | <label>Bằng chữ:</label>&nbsp;<span style={{color:'green',fontWeight:'bold'}}>{this.state.course_price_text}</span>&nbsp;đồng
              </div>
              <div>
              <TextField
                required
                type="number"
                id="lesson_price"
                label="Giá bài từng buổi học"
                onChange={this.onLessonPriceChange.bind(this)}
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="start">Đồng</InputAdornment>,
                }}
                style={{width:300}}
              />	&nbsp;	&nbsp;	&nbsp;

              <label>Định dạng: </label>&nbsp;<span style={{color:'red',fontWeight:'bold'}}>{this.state.course_lesson_number}</span>&nbsp;đồng | <label>Bằng chữ:</label>&nbsp;<span style={{color:'green',fontWeight:'bold'}}>{this.state.course_lesson_text}</span>&nbsp;đồng
              </div>

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
