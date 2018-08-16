import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChatFrame from '../../personalize/pages/live/components/ChatFrame';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


const styles = {

}

class ChannelMaster extends React.Component{

  componentDidMount(){
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });

    this.player.src({
      src: '/images/example.mp4',
      type: 'video/mp4'
    });
    this.player.play();
  }

  render(){
    return(
      <div style={{minHeight:500}}>
        <Grid container>
          <Grid item xs={9}>
          <div data-vjs-player style={{width:'100%',height:598}}>
             <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-button vjs-big-play-centered"
                muted
                controls preload="auto"
                data-setup='{"poster":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4j4oUh2F5EW6qpPLFPi_pA-fbdAfOK3u0jRCBqjhvdLXeA3PH"}'
              />        
           </div>
          </Grid>
          <Grid item xs={3}>
            <ChatFrame/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ChannelMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelMaster);
