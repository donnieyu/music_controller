import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Grid, Typography, ButtonGroup, Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 250,
      minWidth: 250,
      minHeight: 330,
      marginBottom: 10
    },
    media: {
      height: 123,
      paddingTop: 120
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[Math.random()*100],
    },
  }));

export default function RoomListPage(props) {

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        fetch("/api/room-list")
            .then((response) => response.json())
            .then((data) => {
                const _roomList = data.reduce((prev, curr) => {
                    prev.push({
                        id: curr.id,
                        label: curr.title,
                        code: curr.code,
                        host: curr.host,
                        guest_can_pause: curr.guest_can_pause,
                        title: curr.title,
                        minWidth: 170,
                    });
                    return prev;
                }, [])
                setRoomList(data);
            });
    }, []);

    const columns = [
        {id: "id", label: "ID", minWidth: 50, align: "center"},
        {id: "title", label: "Title", minWidth: 170, align: "center"},
        {id: "guest_can_pause", label: "Pause", minWidth: 50, align: "center"},
        {id: "host", label: "Host", minWidth: 170, align: "center"},
        {id: "code", label: "Code", minWidth: 170, align: "center"},
        {id: "actions", label: "Actions", minWidth: 170, align: "center"},
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const history = useHistory();

    const roomButtonPressed = (room) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: room.code,
          }),
        };
        fetch("/api/join-room", requestOptions)
          .then((response) => {
            if (response.ok) {
              history.push(`/room/${room.code}?title=${room.title}`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const deleteRoom = (room) => {
        console.log(room)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: room.code,
            }),
        };
        fetch("/api/delete-room", requestOptions)
            .then((response) => response.json())
            .then((_response) => {
                if (_response.Message === "Success") history.go(0);
            });
    };

    const renderRoomListAsTable = () => {

        return <Grid container spacing={3} style={{padding: "0 140px"}}>
            <Grid item xs={12} align="center">
                <TableContainer sx={{maxHeight: 500}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => {
                                    return <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth, overFlow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}    
                                    >
                                        {column.label}
                                    </TableCell>;
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roomList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((room) => {
                                    return <TableRow hover role="checkbox" key={room.code}>
                                        {columns.map((column) => {
                                            const value = room[column.id];
                                            return <TableCell key={column.id} align={column.align}>
                                                {column.id !== "actions" ? value
                                                    : <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <Button variant="contained" onClick={() => roomButtonPressed(room)} color="primary">
                                                            {`Enter` }
                                                        </Button>
                                                        <IconButton color="default" component="span" onClick={() => deleteRoom(room)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </div>
                                                }
                                            </TableCell>;
                                        })}
                                    </TableRow>
                                })
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5]}
                                    count={roomList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>;
    };

    const [openToast, setOpenToast] = useState(false);

    const handleClose = () => {
        setOpenToast(false);
    }

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const renderRoomListAsCard = () => {
        if (roomList.length !== 0) {
            return <>
                <Grid container direction={"row"} alignItems="center" spacing={3} justifyContent="space-evenly" style={{padding: "0 150px", paddingTop: 12}}>
                        {
                            roomList.map(room => {
                                return roomCardItem(room);
                            })
                        }
                </Grid>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openToast} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Room code is copied.
                    </Alert>
                </Snackbar>
            </>;
        } else {
            return null;
        }
    };

    const _copyToClipboard = (value) => {
        if (value) {
            const el = document.createElement("textarea");
            el.value = value;
            el.setAttribute("readonly", "");
            el.style.width = "1px";
            el.style.height = "1px";
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setOpenToast(true);
            return true;
        }

        return false;
    }
    
    const roomCardItem = (room) => {
        const image_url = room.album_cover;
        const artist = room.artist_string;

        const dateOption = { year: "numeric", month: "long", day: "numeric"};
        const date = new Date(room.created_at).toLocaleDateString("en-US", dateOption);

        return <Card key={room.code} className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={room.title}
                subheader={date}
            />
            <CardMedia
                className={classes.media}
                image={image_url}
                title={artist}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {artist}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share" onClick={() => _copyToClipboard(room.code)}>
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                    onClick={() => deleteRoom(room)}
                    aria-expanded={expanded}
                    aria-label="delete room"
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    onClick={() => roomButtonPressed(room)}
                    aria-label="enter room"
                >
                    <KeyboardReturnIcon />
                </IconButton>
            </CardActions>
        </Card>;
    }

    const [showAsTable, setShowAsTable] = useState(false);

    return <>
        <Grid container>
            <Grid item xs={12} style={{marginBottom: 20}}>
                <Typography variant="h4" compact="h4">
                    Room List
                </Typography>
                <Typography variant="h6">
                    Join a room that describes your music favor! And find your music play-mate~~
                </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
                <Button variant="contained" color="secondary" onClick={() => props.handleCreateModal(true)}>
                    Create a Room
                </Button>
                <Button variant="contained" style={{marginLeft: 5}} color="default" onClick={() => props.handleJoinModal(true)}>
                    Join a Room
                </Button>
                {roomList.length !== 0 && 
                    <Button color="primary" variant="contained" style={{marginLeft: 5}} onClick={() => setShowAsTable(!showAsTable)}>{showAsTable ? "Show as Card" : "Show as Table"}</Button>
                }
            </Grid>
        </Grid>
        {showAsTable ? renderRoomListAsTable() : renderRoomListAsCard()}
    </>
} 