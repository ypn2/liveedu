import React from 'react';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

import { Editor } from '@tinymce/tinymce-react';

const styles = {
  cropwrapper:{
    width:690,
    height:388,
    background:"url('https://via.placeholder.com/690x388')"

  }
}

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
      console.log(e.target.getContent());
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

    saveImage(){
      const canvas = this.editor.getImage().toDataURL();
      let imageURL;
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => (imageURL = window.URL.createObjectURL(blob)));

        this.setState({
          image:canvas,
          scale:1,
          border:0
        })
    }

    setEditorRef(editor){this.editor = editor}

    render(){

      const {classes} = this.props;

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

              {/*crop image*/}
              {
                !this.state.hasImage ? (
                  <div className={classes.cropwrapper}>
                    <input id= 'upload-image-post' onChange={this.uploadImageChange.bind(this)} accept="image/*" style={{display:'none'}}  type="file" />
                    <Button onClick={this.openFileChooser} style={{width:40,height:40}} type="file" variant="fab"  aria-label="edit">
                      <Icon>camera_alt_icon</Icon>
                    </Button>
                     <span> Tải ảnh đại diện</span>
                  </div>
                ):
                  <div>
                    <input id= 'upload-image-post' onChange={this.uploadImageChange.bind(this)} accept="image/*" style={{display:'none'}}  type="file" />
                    <Button onClick={this.openFileChooser} style={{width:40,height:40}} type="file" variant="fab"  aria-label="edit">
                      <Icon>camera_alt_icon</Icon>
                    </Button>
                     <span>  Ảnh đại diện</span>
                    <AvatarEditor
                      ref={this.setEditorRef.bind(this)}
                      image={this.state.image}
                      width={690}
                      height={388}
                      border={this.state.border}
                      color={[0, 0, 0, 0.5]}
                      scale={this.state.scale}
                      rotate={0}
                      />
                    <button onClick={this.saveImage.bind(this)}>Save Image</button>

                </div>
              }

              {/*end crop image*/}

                <br/>
                <br/>
                <Typography color="textSecondary">
                  Nội dung bài viết
                </Typography>
                <br/>
                  <Editor
                     initialValue="<p>This is the initial content of the editor</p>"
                     init={{
                       plugins : 'advlist autolink link image lists charmap print preview emoticons',
                       toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | emoticons'
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

PostCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCreate);
