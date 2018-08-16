import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import PDFIcon from './file_pdf.png';
import Divider from '@material-ui/core/Divider';
import FolderIcon from '@material-ui/icons/Folder';
import axios from 'axios';
import {NavLink} from "react-router-dom";


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list_item_icon: {
    width:25
  },
  folderIcon:{
    color:'orange'
  }
});

class FolderBrowser extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      listItem:[]
    }

  }


  render(){

    axios.post('/load-folder',{
      path:this.props.Path
    })
    .then(function(response){
      this.setState({
        listItem:response.data
      })
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });

    const { classes } = this.props;

    return(
      <div>
        <List>
          {
            this.state.listItem.map(node=>{
              return(
                <div>
                  <NavLink to={node.type=='file' ? '/internal-documents/file/' + encodeURIComponent(node .path) : '/internal-documents/folder/' + encodeURIComponent(node.path)}>
                      <ListItem
                        role={undefined}
                        dense
                        button
                        className={classes.listItem}
                      >
                      {
                        node.type=='folder' ?(
                          <FolderIcon className={classes.folderIcon}/>
                        ):(
                          <img className={classes.list_item_icon} src= {PDFIcon} />
                        )
                      }

                        <ListItemText primary={node.name} />
                        <ListItemSecondaryAction>
                          <IconButton aria-label="Comments">
                            <CommentIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </NavLink>
                    <Divider/>
                </div>
              )
            })
          }
        </List>

      </div>
    )
  }
}

FolderBrowser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderBrowser);
