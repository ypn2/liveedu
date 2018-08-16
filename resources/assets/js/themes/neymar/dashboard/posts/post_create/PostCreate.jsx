import React from 'react';
import TinyMCE from 'react-tinymce';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';


export default class PostCreate extends React.Component{

    handleEditorChange(e) {
      console.log(e.target.getContent());
    }

    render(){
      return(
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
                <Button style={{width:40,height:40}} variant="fab" color="secondary" aria-label="edit">
                  <Icon>camera_alt_icon</Icon>
                </Button>
                <span>  Ảnh đại diện</span>
              <br/>
              <br/>
              <Typography color="textSecondary">
                Nội dung bài viết
              </Typography>
              <br/>
              <TinyMCE
                content="<p>This is the initial content of the editor</p>"
                  config={{
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                  }}
                  onChange={this.handleEditorChange}
                />
            </div>
          </CardContent>
        </Card>
      )
    }
}
