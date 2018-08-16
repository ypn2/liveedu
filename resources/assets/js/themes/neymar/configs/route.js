const route = {
  base:'/trainer-management',
  account_menu:{
    base:'/account',
    profile:'/profile'
  },
  nav:{
    course:{
      base:'/course',
      course_list:'/list',
      course_reg:'/reg'
    },
    classs:{
      base:'/class',
      class_list:'/list',
      class_reg:'/reg'
    },
    post:{
      base:'/post',
      post_list:'/list',
      post_create:'/create'
    },
    channel_settings:{
      base:'/channel-settings'
    },
    my_class:'/my-class',
    discuss:'/discuss'
  }
}

export default route;
