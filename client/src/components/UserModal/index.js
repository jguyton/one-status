import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import {
  createStyles,
  Modal,
  Button,
  Box,
  TextField,
  Typography
} from "@material-ui/core";
import API from "../../lib/api";

const styles = createStyles({
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  header: {
    fontSize: "25px",
    fontFamily: "'Alegreya', serif",
    paddingBottom: 20,
    color: "black"
  },
  paper: {
    position: "absolute",
    width: "500px",
    height: "350px",
    top: "50%",
    left: "50%",
    marginLeft: "-250px",
    marginTop: "-175px",
    backgroundColor: "white",
    borderRadius: "10px",
    outline: "none",
    padding: "20px"
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer"
  },
  button: {
    height: "40px",
    width: "200px",
    color: "white",
    fontSize: "14px",
    fontFamily: "'Alegreya', serif",
    backgroundColor: "#0075cc"
  },
  primary: {
    margin: "10px",
    height: "40px",
    width: "100px",
    color: "white",
    fontSize: "14px",
    fontFamily: "'Alegreya', serif",
    backgroundColor: "#0075cc"
  },
  secondary: {
    margin: "10px",
    height: "40px",
    width: "100px",
    color: "white",
    fontSize: "14px",
    fontFamily: "'Alegreya', serif",
    backgroundColor: "FE1B60"
  },
  input: {
    width: "100%"
  }
});

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      username: " ",
      tweet: " ",
      isUsernameError: false
    };
  }

  handleClose = () => this.setState({ isModalOpen: false });
  handleOpen = () => this.setState({ isModalOpen: true });

  handleUsernameChange = e => {
    const username = e.target.value;
    if (username.length < 50 && /^[A-Za-z0-9 ]+$/.test(username))
      this.setState({ username, isUsernameError: false });
  };

  handleTweetChange = e => {
    if (e.target.value.length < 250) this.setState({ tweet: e.target.value });
  };

  submitNewUser = () => {
    const { username, tweet, isUsernameError } = this.state;
    const cleanUsername = username.replace(/\s+/g, "").trim();

    if (cleanUsername !== "" && !isUsernameError) {
      const newUser = {
        username: username.replace(/\s+/g, "").trim(),
        tweet: tweet
      };
      const submit = API.addUser(newUser);

      submit.then(res => {
        if (res.status === 409) {
          this.setState({ isUsernameError: true });
        } else {
          this.cancel();
          window.location.pathname = `/${cleanUsername}`;
        }
      });
    }
  };

  cancel = () => {
    this.setState({ username: " ", tweet: " ", isModalOpen: false, isUsernameError: false });
  };

  render() {
    const { classes } = this.props;
    const { isModalOpen, username, tweet, isUsernameError } = this.state;

    return (
      <>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.handleOpen}
        >
          Create a new user
        </Button>
        <Modal open={isModalOpen} onClose={this.handleClose}>
          <Box
            className={classes.paper}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography className={classes.header}>New user</Typography>
            <TextField
              error={isUsernameError}
              label={
                isUsernameError
                  ? "Please enter a different username"
                  : "Username"
              }
              className={classes.input}
              onChange={this.handleUsernameChange}
              value={username}
              margin="normal"
              variant="outlined"
              multiline
              rowsMax="2"
            />
            <TextField
              label="Tweet"
              className={classes.input}
              onChange={this.handleTweetChange}
              value={tweet}
              margin="normal"
              variant="outlined"
              multiline
              rowsMax="4"
            />
            <Box display="flex" flexDirection="row">
              <Button
                size="small"
                variant="contained"
                onClick={this.submitNewUser}
                className={classes.primary}
              >
                Save
              </Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={this.cancel}
                className={classes.secondary}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }
}

export default withStyles(styles)(UserModal);
