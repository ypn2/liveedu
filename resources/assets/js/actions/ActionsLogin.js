import dispatcher from '../dispatcher/dispatcher';

export function loginSuccess(){
  dispatcher.dispatch({
    type:'LOGIN_SUCCESS'
  })
}
