import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher';
import axios from 'axios';


class Stores extends EventEmitter {

  loginSuccess(){
    this.emit('LOGIN_SUCCESS');
  }

  handleAction(actions){
    switch (actions.type) {
      case 'LOGIN_SUCCESS':
        this.loginSuccess();
        break;
      default:
    }
  }

}

const StoresLogin = new Stores();

dispatcher.register(StoresLogin.handleAction.bind(StoresLogin));

export default StoresLogin
