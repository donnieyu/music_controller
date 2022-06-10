import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
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
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
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

  renderHomePage() {
    return (
      <Grid container style={{backgroundImage: "", height: "100%", overflow: "auto", overflowX: "hidden"}}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
          <Typography variant="h6" compact="h6">
            This is a place where you share your music playlist and share ideas with others.
          </Typography>
        </Grid>
        <Grid container xs={12} alignItems="center" justifyContent="center">
          <Typography variant="h6" compact="h6">
            Create your own music room by logging in Spotify and start your play list!
          </Typography>
        </Grid>
        <Grid container xs={12} alignItems="center" justifyContent="center">
          <Button variant="contained" color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" compact="h6">
            Or, join a room that describes your music favor! And find your music play-mate~~
          </Typography>
          <RoomListPage/>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="default" to="/info" component={Link}>
              Info
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
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
    );
  }
}
