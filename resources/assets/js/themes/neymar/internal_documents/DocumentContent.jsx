import React from 'react';
import FolderBrowser from './FolderBrowser';

export default class DocumentContent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
      {
          this.props.Type =='file' ? (
            <iframe  type="application/pdf" style={{width:'100%',height:'89vh'}} src={"/" + decodeURIComponent(this.props.Path) +"#toolbar=0"}>
              <p>Your browser does not support iframes.</p>
            </iframe>
          ):(
            <FolderBrowser Path={decodeURIComponent(this.props.Path)} />
          )
      }
      </div>
    )
  }
}
