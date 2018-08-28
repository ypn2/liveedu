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


import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function getCroppedImg(image, pixelCrop, fileName) {

  alert('#cropt');

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      file.name = fileName;
      resolve(file);
    }, 'image/jpeg');
  });
}


export default class PostCreate extends React.Component{

    constructor(){
      super();
      this.state = {
        image:'#',
        crop: {
           x: 20,
           y: 10,
           width:16,
           height:9,
           aspect: 16/9
        }
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

      if (input.files && input.files[0]) {

         var reader = new FileReader();

         reader.onload = function(e) {
            //$('#blah').attr('src', e.target.result);
           _self.setState({
              image:e.target.result
           })
         }

         reader.readAsDataURL(input.files[0]);
       }

    }

    onImageLoaded(){
      //alert('image loaded');
    }

    onComplete(){
      alert('image croped loaded');
    }

    cropChange(crop){
      this.setState({ crop });
    }

    cropImage(){

      var image =  document.getElementById("myimage");

      var c = document.getElementById("myCanvas");
       var ctx = c.getContext("2d");
       ctx.drawImage(image, 10, 10);

      console.log(image);
      // const   pixelCrop = this.state.crop;
      // const fileName='result';
      //
      getCroppedImg(image,pixelCrop,fileName);
    }

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
                    {
                      // <ReactCrop
                      //   onImageLoaded={this.onImageLoaded}
                      //   onComplete={this.onCropComplete}
                      //   onChange={this.cropChange.bind(this)}
                      //   crop={this.state.crop}
                      //   src={this.state.image}
                      //   />
                    }
                    <img id="myimage" src="https://v1-3-0.material-ui.com/static/images/uxceo-128.jpg" />

                    <canvas id="myCanvas" width="240" height="297" style={{border:'1px solid #d3d3d3'}}/>

                    <button onClick={this.cropImage.bind(this)}>crop</button>
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
