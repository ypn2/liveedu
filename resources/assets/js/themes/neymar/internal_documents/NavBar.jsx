/*import libs*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import PDFIcon from './file_pdf.png';
import IconButton from '@material-ui/core/IconButton';

/*import components*/
import ThemeContext from '../configs/context';
import route from '../configs/route';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    marginLeft:theme.spacing.unit * 6,
    borderLeft:'1px dotted rgba(0,0,0,0.7)'
  },

  navlink:{
    textDecoration:'none',
    padding:'0px!important'
  },
  tree_node:{
    fontSize:11
  },
  node_icon:{
    color:'orange'
  },
  ytj:{
    content:'',
    width:20,
    display:'block',
    borderTop:'1px dotted rgba(0,0,0,0.7)'
  },
  childchild:{
    paddingLeft:0
  },
  file_icon:{
    width:20
  }
});

var depth = 0;

class TreeNode extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isExpand:false
    }
  }

  handleExpand(){
    this.setState({
      isExpand:!this.state.isExpand
    })
  }

  render(){

    const {node,classes,depth} = this.props;
    return(
      <div>
        <NavLink className={classes.navlink} to={node.type=='file' ? '/internal-documents/file/' + encodeURIComponent(node .path) : '/internal-documents/folder/' + encodeURIComponent(node.path)}>
          <ListItem button className={depth ==1 ? classes.childchild:null}>
            {
              depth ==1 ? (<div className={classes.ytj}></div>) :null
            }
            <ListItemIcon>
                {node.type=='folder' ? (<FolderIcon className={classes.node_icon} />) : <img className={classes.file_icon} src={PDFIcon}/>}
            </ListItemIcon>
            <ListItemText inset primary={<Typography className={classes.tree_node}>{node.name}</Typography>} />
            {
              node.type=='folder' ?   (
                <IconButton onClick={this.handleExpand.bind(this)}>
                  {
                    this.state.isExpand ? <ExpandLess /> : <ExpandMore />
                  }
                </IconButton>
              ) : null
            }

          </ListItem>
        </NavLink>
        {
          node.type =='folder' ? (
            <Collapse className={classes.collapse} in={this.state.isExpand} timeout="auto" unmountOnExit>
              <List className={classes.nested} component="div" disablePadding>
                {
                  showTree(node.subb,classes,1)
                }
              </List>
            </Collapse>
          ):null
        }
      </div>
    )
  }
}

function showTree(dir,classes,depth){
  var data = dir.map(node=>{
    return(
      <TreeNode depth={depth} key={node.id}  node={node} classes = {classes}/>
    )
  });
  return data;
}



class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tree:[]
    };
  }

  componentDidMount(){
    axios.post('/internal-document')
    .then(function(response){
      this.setState({
        tree:response.data
      });

    }.bind(this))
    .catch(function(err){

    });
  }

  handleClick (param)  {
    this.setState(state => (
      {
        [param]:!this.state[param]
      }
    ));

  }

  render() {
    const { classes } = this.props;
    const {tree} = this.state;
    return (

      <div className={classes.root}>
        <List component="nav">
          {
            showTree(tree,classes,0)
          }
        </List>

      </div>


    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
