import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import ColarPanel from '../../component/ColorPanel/ColarPanel';
import Messages from '../../component/Messages/Messages';
// import MetaPanel from '../../component/MetaPanel/MetaPanel';
import SidePanel from '../../component/SidePanel/SidePanel';
import './Home.css';

const Home = ({ currentUser, currentChannel, isPrivateChannel }) => (
  <Grid columns='equal' className='app' style={{ background: '#eee' }}>
    <ColarPanel />
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>
    {/* <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column> */}
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(Home);
