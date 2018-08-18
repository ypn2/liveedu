import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher';
import axios from 'axios';


class Stores extends EventEmitter {

  loginSuccess(status){
    this.emit('EVENT_LOGIN',{status});
  }

  logout(){  
    this.emit('EVENT_LOGOUT');
  }

  handleAction(action){
    switch (action.type) {
      case 'EVENT_LOGIN':
        this.loginSuccess(action.status);
        break;
      case 'EVENT_LOGOUT':
        this.logout();
        break;
      default:
    }
  }

}

const StoresLogin = new Stores();

dispatcher.register(StoresLogin.handleAction.bind(StoresLogin));

export default StoresLogin
