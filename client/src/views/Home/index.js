import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { Box, Avatar, Typography } from "@material-ui/core";
import ReactTyped from "react-typed";
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
import UserModal from "../../components/UserModal";

const styles = createStyles({
  container: {
    height: "100vh",
    margin: "5% 10%",
    width: "75%"
  },
  headerWrapper: {
    width: "100%",
    position: "relative"
  },
  header: {
    fontSize: "40px",
    fontFamily: "'Alegreya', serif",
    paddingBottom: 50,
    letterSpacing: 3,
    fontWeight: 600
  },
  input: {
    width: "100%",
    marginBottom: "50px",
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
  userWrapper: {
    width: "95%",
    margin: "30px 0 30px 75px",
    position: "relative",
    textDecoration: "none",
    color: "initial"
  },
  content: {
    boxShadow: "rgba(0, 0, 0, 0.08) 0px 10px 10px",
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    height: "80px",
    padding: "0 65px",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px"
  },
  username: {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "22px",
    fontFamily: "'Alegreya', serif"
  },
  tweet: {
    fontSize: "18px",
    fontFamily: "'Alegreya', serif"
  },
  scroll: {
    height: 600,
    width: "100%",
    overflowY: "scroll",
    padding: "0 25px"
  },
  hover: {
    border: "2px solid black"
  },
  modal: {
    position: "absolute",
    right: 0,
    top: "15px"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      query: ""
    };
  }

  componentDidMount() {
    const users = API.getAllUsers();

    users.then(users => {
      this.setState({ users });
    });
  }

  handleInputChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  renderAvatar = id => {
    const { classes } = this.props;
    const newId = id
      .toString()
      .split("")
      .pop();

    switch (newId) {
      case "1":
        return <Avatar className={classes.avi} src={Person1} />;
      case "2":
        return <Avatar className={classes.avi} src={Person2} />;
      case "3":
        return <Avatar className={classes.avi} src={Person3} />;
      case "4":
        return <Avatar className={classes.avi} src={Person4} />;
      case "5":
        return <Avatar className={classes.avi} src={Person5} />;
      case "6":
        return <Avatar className={classes.avi} src={Person6} />;
      case "7":
        return <Avatar className={classes.avi} src={Person7} />;
      case "8":
        return <Avatar className={classes.avi} src={Person8} />;
      case "9":
        return <Avatar className={classes.avi} src={Person9} />;
      default:
        return <Avatar className={classes.avi} src={Person1} />;
    }
  };

  render() {
    const { classes } = this.props;
    const { users, query } = this.state;

    return (
      <Box
        className={classes.container}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="row"
          className={classes.headerWrapper}
          justifyContent="center"
        >
          <ReactTyped
            strings={[
              "What would be your last tweet?",
              "What advice would you give a stranger?",
              "What is on your mind?"
            ]}
            typeSpeed={50}
            backSpeed={50}
            backDelay={1}
            smartBackspace
            className={classes.header}
          />
          <Box className={classes.modal}>
            <UserModal />
          </Box>
        </Box>

        <Input
          className={classes.input}
          placeholder="Search for a user...."
          onChange={this.handleInputChange}
        />
        <Box className={classes.scroll} display="flex" flexDirection="column">
          {users
            .filter(user => user.username.toLowerCase().includes(query))
            .sort((a, b) => (a.username > b.username ? 1 : -1))
            .map((user, idx) => (
              <RouterLink
                to={user.username}
                className={classes.userWrapper}
                key={idx}
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  {this.renderAvatar(user.id)}
                  <Box className={classes.content}>
                    <Typography className={classes.username}>
                      {`@${user.username}`}
                    </Typography>
                    <Typography
                      className={classes.tweet}
                    >{`"${user.tweet}"`}</Typography>
                  </Box>
                </Box>
              </RouterLink>
            ))}
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(Home);
