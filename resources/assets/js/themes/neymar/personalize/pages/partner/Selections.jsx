import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

export default class Selections extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      checked:false,
      showSnack:false
    };
  }

  handleChange(){

    axios.post('/api/partner/active',{
      id:this.props.partnerId
    })
    .then(function(response){
      if(response.data.code ==200){
        this.setState({
          showSnack:true
        });
      }
    }.bind(this))
    .catch(function(err){
      console.log(response.err);
    })

    this.setState({
      checked:!this.state.checked
    })
  }

  handleCloseSnack(){
    this.setState({ showSnack: false });
  }



  render(){
    return(
      <div>
        <Switch
            checked={this.state.checked}
            onChange={this.handleChange.bind(this)}
            color="primary"
          />
          <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'right' }}
            open={this.state.showSnack}
            onClose={this.handleCloseSnack.bind(this)}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Kích hoạt tài khoản streammer partner thành công</span>}
          />
      </div>
    )
  }
}
