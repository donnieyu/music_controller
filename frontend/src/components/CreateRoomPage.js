import React, { Component } from "react";
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";


export default class CreateRoomPage extends Component {
    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: "true",
            votesToSkip: this.defaultVotes,
        };
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChanged = this.handleVotesChanged.bind(this);
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    }

    handleVotesChanged(e) {
        this.setState({votesToSkip: e.target.value});
    }

    handleGuestCanPauseChange(e) {
        this.setState({guestCanPause: e.target.value === "true" ? true : false});
    }

    handleRoomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push("/room/" + data.code));
    }

    render() {
        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Creat Room Page
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        Guest Control of Playback state
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                        <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary"/>}
                            label="Play/Pause"
                            labelPlacement="bottom"/>
                        <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary"/>}
                            label="No Control"
                            labelPlacement="bottom"/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={ 12 } align="center">
                <FormControl>
                    <TextField 
                        required={ true } 
                        type="number" 
                        defaultValue={ this.defaultVotes } 
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" }
                        }}
                        onChange={this.handleVotesChanged}/>
                        <FormHelperText>
                                Votes Required to Skip Song
                        </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={ 12 } align="center">
                <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
                    Create a Room
                </Button>
            </Grid>
            <Grid item xs={ 12 } align="center">
                <Button color="secondary" variant="contained" to="/" component={ Link }>
                    Back
                </Button>
            </Grid>
        </Grid>;
    }
}