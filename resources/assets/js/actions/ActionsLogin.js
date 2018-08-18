import dispatcher from '../dispatcher/dispatcher';

export function loginSuccess(status){
  dispatcher.dispatch({
    type:'EVENT_LOGIN',
    status
  })
}

export function logout(){
  dispatcher.dispatch({
    type:'EVENT_LOGOUT',
  })
}
