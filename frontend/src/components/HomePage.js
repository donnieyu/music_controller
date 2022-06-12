import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography, Modal } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Info from "./Info";
import RoomListPage from "./RoomListPage";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
      openCreateModal: false,
      openJoinModal: false,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
    this.handleCreateModal = this.handleCreateModal.bind(this);
    this.handleJoinModal = this.handleJoinModal.bind(this);
  }

  async componentDidMount() {
    // fetch("/api/user-in-room")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       roomCode: data.code,
    //     });
    //   });
  }

  handleCreateModal(showModal) {
    this.setState({
      openCreateModal: showModal
    })
  }

  handleJoinModal(showModal) {
    this.setState({
      openJoinModal: showModal
    })
  }

  renderHomePage() {
    return <>
      <Grid container style={{backgroundImage: "", height: "100%", overflow: "auto", overflowX: "hidden"}}>
        <Grid item xs={12} style={{ height: 200, display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
          <Typography variant="h6" compact="h6">
            This is a place where you share your music playlist and share ideas with others.
          </Typography>
          <Typography variant="h6" compact="h6">
            Create your own music room by logging in Spotify and start your play list!
          </Typography>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          {/* <Button variant="contained" color="secondary" to="/create" component={Link}>
            Create a Room
          </Button> */}
          {/* <Button variant="contained" color="secondary" onClick={() => this.handleModal(true)}>
            Create a Room
          </Button> */}
        </Grid>
        <Grid item xs={12} align="center">
          <RoomListPage handleCreateModal={this.handleCreateModal} handleJoinModal={this.handleJoinModal}/>
        </Grid>
        <Grid item xs={12} align="center" style={{height: 100}}>
          <ButtonGroup disableElevation variant="contained" style={{height: 100, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button color="default" to="/info" component={Link}>
              Info
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      
      <Modal
        open={this.state.openCreateModal}
        onClose={() => this.handleCreateModal(false)}
      >
        <CreateRoomPage handleModal={this.handleCreateModal}></CreateRoomPage>
      </Modal>
      <Modal
        open={this.state.openJoinModal}
        onClose={() => this.handleJoinModal(false)}
      >
        <RoomJoinPage handleModal={this.handleJoinModal}></RoomJoinPage>
      </Modal>
    </>;
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
      openCreateModal: false,
      openJoinModal: false
    });
  }

  render() {
    return <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              );
            }}
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/info" component={Info} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
            }}
          />
          <Route 
            path="/room-list"
            render={(props) => {
              return <RoomListPage {...props} />;
            }}
          />
        </Switch>
      </Router>
    </>;
  }
}
