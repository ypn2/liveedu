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


import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function getCroppedImg(image, pixelCrop, fileName) {

  //alert('#cropt');

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
  const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  // return new Promise((resolve, reject) => {
  //   canvas.toBlob(file => {
  //     file.name = fileName;
  //     resolve(file);
  //   }, 'image/jpeg');
  // });

  return base64Image;
}


export default class PostCreate extends React.Component{

    constructor(){
      super();
      this.state = {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8--W3In1em5F5MTwuDGCu6wPa_iYls2T139ymHxNKF01VFot4RA',
        crop: {
           x: 20,
           y: 10,
           width:200,
           height:400,
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

    async cropImage(){

      const image =  $('.ReactCrop__image')[0];
      const pixelCrop = this.state.crop;
      const fileName = 'result_crop';

      const croppedImg = await getCroppedImg(image,pixelCrop,fileName);

      this.setState({
        image:croppedImg
      })

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
                    <AvatarEditor
                      image={this.state.image}
                      width={345}
                      height={194}
                      border={50}
                      color={[255, 255, 255, 0.6]} // RGBA
                      scale={1.2}
                      rotate={0}
                    />

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
