import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button
} from "@material-ui/core";

import API from "../../lib/api";
import Person1 from "../../assets/person1.png";
import Person2 from "../../assets/person2.png";
import Person3 from "../../assets/person3.png";
import Person4 from "../../assets/person4.png";
import Person5 from "../../assets/person5.png";
import Person6 from "../../assets/person6.png";
import Person7 from "../../assets/person7.png";
import Person8 from "../../assets/person8.png";
import Person9 from "../../assets/person9.png";

const styles = createStyles({
  container: {
    height: "100vh",
    margin: "5% 10%",
    width: "75%"
  },
  card: {
    maxWidth: 500,
    width: "100%"
  },
  media: {
    height: 300
  },
  header: {
    fontSize: "40px",
    fontFamily: "'Alegreya', serif",
    paddingBottom: 75
  },
  input: {
    width: "100%",
    fontSize: "18px",
    fontFamily: "'Alegreya', serif"
  },
  avi: {
    height: "120px",
    width: "120px",
    boxShadow: "rgba(0, 0, 0, 0.08) 0px 10px 30px",
    backgroundColor: "rgb(255, 255, 255)",
    position: "absolute",
    left: "-75px"
  },
  username: {
    fontWeight: "bold",
    fontSize: "22px",
    fontFamily: "'Alegreya', serif"
  },
  lastupdated: {
    fontSize: "12px",
    fontFamily: "'Alegreya', serif"
  },
  goBackWrapper: {
    color: "initial",
    marginTop: 50
  },
  goBack: {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "'Alegreya', serif"
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isEditing: false,
      newTweet: ""
    };
  }

  componentDidMount() {
    const user = API.getUserByUsername(this.props.match.params.username);

    user.then(u => {
      this.setState({ user: u, newTweet: u.tweet });
    });
  }

  triggerEdit = () => this.setState({ isEditing: true });
  cancelEdit = () => {
    const { tweet } = this.state.user;
    this.setState({ isEditing: false, newTweet: tweet });
  };

  updateNewTweet = e => {
    if (e.target.value.length < 250)
      this.setState({ newTweet: e.target.value });
  };

  updateUserTweet = () => {
    const { user, newTweet } = this.state;
    const newUser = {
      username: user.username,
      tweet: newTweet
    };
    const update = API.updateUserTweet(newUser);
    update.then(() => {
      this.setState({
        user: {
          ...user,
          tweet: newTweet
        },
        isEditing: false
      });
    });
  };

  getAvatarImage = id => {
    const newId = id
      .toString()
      .split("")
      .pop();

    switch (newId) {
      case "1":
        return Person1;
      case "2":
        return Person2;
      case "3":
        return Person3;
      case "4":
        return Person4;
      case "5":
        return Person5;
      case "6":
        return Person6;
      case "7":
        return Person7;
      case "8":
        return Person8;
      case "9":
        return Person9;
      default:
        return Person1;
    }
  };

  render() {
    const { classes } = this.props;
    const { user, isEditing, newTweet } = this.state;
    let lastUpdated = new Date(user.updatedAt);
    lastUpdated = lastUpdated.toDateString();
    return (
      <Box
        className={classes.container}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography className={classes.header}>Update user profile</Typography>
        {"id" in user ? (
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={this.getAvatarImage(user.id)}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                alignItems="center"
              >
                <Typography className={classes.username}>
                  {`@${user.username}`}
                </Typography>

                <Typography className={classes.lastupdated}>
                  Last updated: {lastUpdated}
                </Typography>
              </Box>

              <Input
                value={newTweet}
                disabled={!isEditing}
                onChange={this.updateNewTweet}
                className={classes.input}
                multiline
                rowsMax="5"
              />
            </CardContent>
            <CardActions>
              {isEditing ? (
                <Box display="flex" flexDirection="row">
                  <Button size="small" onClick={this.updateUserTweet}>
                    Save
                  </Button>
                  <Button size="small" onClick={this.cancelEdit}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button size="small" color="primary" onClick={this.triggerEdit}>
                  Edit
                </Button>
              )}
            </CardActions>
          </Card>
        ) : (
          <Typography className={classes.username}>
            No user found. Go back and create new user now!
          </Typography>
        )}
        <Link to="/" className={classes.goBackWrapper}>
          <Typography className={classes.goBack}>{`< back`}</Typography>
        </Link>
      </Box>
    );
  }
}

export default withStyles(styles)(Profile);
