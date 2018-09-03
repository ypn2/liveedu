import React from 'react';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import AvatarEditor from 'react-avatar-editor'
import Divider from '@material-ui/core/Divider';

import axios from 'axios';

import { Editor } from '@tinymce/tinymce-react';

const styles = {
  cropwrapper:{
    width:'100%',
    height:388,
    background:"url('https://via.placeholder.com/690x388')"
  },

}

var  postContent='';
var image_cover = '';

class PostCreate extends React.Component{

    constructor(){
      super();
      this.state = {
        hasImage:false,
        image:'#',
        scale:1,
        border:0,
      }
    }

    handleEditorChange(e) {
      postContent = e.target.getContent();
    }

    openFileChooser(){
      $('#upload-image-post').click();
    }

    uploadImageChange(event){

        var image, file;

        var input = event.target;
        var _self = this;

       if (input.files && input.files[0]) {

           image = new Image();

           image.onload = function() {

                _self.setState({
                  border:50,
                  hasImage:true,
                  image:this.src,
                  scale:Math.floor(this.width / 345)
                })

           };

           image.src = window.URL.createObjectURL(input.files[0]);

       }

    }


    reloadImage(){
      const canvas = this.editor.getImage().toDataURL();

      let imageURL;
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => (imageURL = window.URL.createObjectURL(blob)));

        image_cover = canvas

    }


    setEditorRef(editor){this.editor = editor}

    submitForm(){

      const title = $('#post_name').val();

      if(title.length < 3 ){
        alert('Tên bài viết cần nhiều hơn 3 ký tự');
        return;
      }

      axios.post('/api/post/create',{
        title,
        image_cover,
        postContent
      })
      .then(function(response){
        console.log(response.data);
      })
      .catch(function(err){

      });


    }

    render(){

      const {classes} = this.props;

      return(
        <Grid  container spacing={16}>
          {/*main content*/}
          <Grid item sm={10}>
            <Card style={{borderRadius:0}}>
              <CardContent style={{padding:0,borderRadius:0}}>

                <table className='pan-post-infomations'>
                  <tr>
                    <td className="pan-post-td-first">
                      <span>Tên bài viết</span>
                    </td>
                    <td className="pan-post-td-second">
                      <input
                        required
                        id="post_name"
                        label='Tên bài viết'
                        margin="normal"
                        style={{width:'100%',border:'1px solid #f0f0f0',padding:'3px 5px',fontSize:'1.5em'}}
                        placeholder='Tên bài viết'
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="pan-post-td-first">
                      <span>Logo</span>
                    </td>
                    <td className="pan-post-td-second">
                      {/*crop image*/}
                      <div>
                      <table style={{width:'100%'}}>
                        <tr>
                          <td style={{textAlign:'center'}}>
                            <input id= 'upload-image-post' onChange={this.uploadImageChange.bind(this)} accept="image/*" style={{display:'none'}}  type="file" />
                            <Button onClick={this.openFileChooser} style={{width:40,height:40}} type="file" variant="fab"  aria-label="edit">
                              <Icon>cloud_upload</Icon>
                            </Button>
                             <p>Tải ảnh lên</p>
                          </td>
                          <td>
                            <AvatarEditor
                              id='image-editor'
                              ref={this.setEditorRef.bind(this)}
                              image={this.state.image}
                              width={690}
                              height={388}
                              border={this.state.border}
                              color={[0, 0, 0, 0.5]}
                              scale={this.state.scale}
                              onPositionChange = {this.reloadImage.bind(this)}
                              onImageReady = {this.reloadImage.bind(this)}
                              rotate={0}
                              />
                          </td>
                        </tr>
                      </table>



                    </div>

                      {/*end crop image*/}
                    </td>
                  </tr>

                  <tr>
                    <td className="pan-post-td-first">
                      <span>Nội dung bài viết</span>
                    </td>
                    <td className="pan-post-td-second">
                      <Editor
                         init={{
                           plugins : 'advlist autolink link image lists charmap print preview codesample wordcount',
                           toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | codesample',
                          height:"500"
                         }}
                         onChange={this.handleEditorChange}
                       />
                    </td>
                  </tr>
                </table>

              </CardContent>
            </Card>

          </Grid>

          <Grid item sm={2}>
            <Card style={{borderRadius:0}}>
              <CardContent style={{padding:'10px 5px'}}>
                <span style={{fontWeight:'bold'}}>Tùy biến</span>
              </CardContent>
              <Divider/>
              <CardActions>
                <Button onClick={this.submitForm.bind(this)} variant="contained" aria-label="Đăng bài" color="primary" size="small">Đăng bài</Button>
                <Button variant="contained" aria-label="Đăng bài" color="secondary" size="small">Hủy bỏ</Button>
              </CardActions>
            </Card>
          </Grid>

        </Grid>
      )
    }
}

PostCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCreate);
