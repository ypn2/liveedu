import React from 'react';
import TinyMCE from 'react-tinymce';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import AvatarEditor from 'react-avatar-editor'



export default class PostCreate extends React.Component{

    constructor(){
      super();
      this.state = {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8--W3In1em5F5MTwuDGCu6wPa_iYls2T139ymHxNKF01VFot4RA',
      }
    }

    handleEditorChange(e) {
      console.log(e.target.getContent());
    }

    openFileChooser(){
      $('#upload-image-post').click();
    }

    uploadImageChange(event){
      var input = event.target;
      var _self = this;


      var image, file;


      if (input.files && input.files[0]) {

        image = new Image();

         image.onload = function() {

             alert("The image width is " +input.width + " and image height is " + input.height);
         };
       }

    }

    saveImage(){
      const canvas = this.editor.getImage().toDataURL();
      let imageURL;
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => (imageURL = window.URL.createObjectURL(blob)));
        console.log(canvas);

        this.setState({
          image:canvas
        })
    }

    setEditorRef(editor){this.editor = editor}

    render(){
      return(
        <div>
          <div style={{marginBottom:15}}>
            <Button variant="contained" aria-label="Đăng bài" color="primary" size="small">Đăng bài</Button>
          </div>

          <Card>
            <CardContent>
              <div>
                <TextField
                  required
                  id="entry_post_name"
                  label='Tên bài viết'
                  margin="normal"
                  style={{minWidth:550}}
                />
              <br/><br/>
                  <input id= 'upload-image-post' onChange={this.uploadImageChange.bind(this)} accept="image/*" style={{display:'none'}}  type="file" />
                  <Button onClick={this.openFileChooser} style={{width:40,height:40}} type="file" variant="fab" color="secondary" aria-label="edit">
                    <Icon>camera_alt_icon</Icon>
                  </Button>
                   <span>  Ảnh đại diện</span>
                  <br/><br/>
                  <div>
                    <AvatarEditor
                      ref={this.setEditorRef.bind(this)}
                      image={this.state.image}
                      width={345}
                      height={194}
                      border={0}
                      color={[255, 255, 255, 0.6]}
                      scale={4}
                      rotate={0}
                    />
                  <button onClick={this.saveImage.bind(this)}>Save Image</button>
                  </div>
                <br/>
                <br/>
                <Typography color="textSecondary">
                  Nội dung bài viết
                </Typography>
                <br/>
                <TinyMCE
                    config={{
                      plugins: 'autolink link image lists print preview',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
                      height:500
                    }}
                    onChange={this.handleEditorChange}
                  />
              </div>
            </CardContent>
          </Card>

        </div>
      )
    }
}
