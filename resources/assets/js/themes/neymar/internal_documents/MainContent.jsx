import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PDFIcon from './file_pdf.png';
import {Route,Router} from "react-router-dom";
import DocumentContent from './DocumentContent';

const styles = {
  list_item_ava:{
    width:35,
    height:35
  },
  list_item_icon:{
    color:'green'
  }
}

const InternalDocumentMaster =()=>(
  <h1>Document Master</h1>
)

const DocumentContentPage =({match})=>(
  <DocumentContent Path = {match.params.name} Type={match.params.type}/>
)

class MainContent extends React.Component{
  render(){

    const {classes} = this.props;

    return(
      <div>
          <Route path='/internal-documents/:type/:name' component={DocumentContentPage} />
      </div>
    )
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainContent);
