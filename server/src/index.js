import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
import models, { sequelize } from "./models";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

app.use("/users", routes.user);

app.get("/", (req, res) => {
  res.send("we in this bitch!");
});

// re-init database on server start
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsernamesWithTweets();
  }

  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
  );
});


const createUsernamesWithTweets = async () => {
  const data = [
    {
      username: "snoopdoggfan",
      tweet: "If it’s flipping hamburgers at McDonald’s, be the best hamburger flipper in the world. Whatever it is you do you have to master your craft."
    },
    {
      username: "tupacfan",
      tweet: "Reality is wrong. Dreams are for real"
    },
    {
      username: "chancetherapperfan",
      tweet: "I can’t gain anything off of anyone else not succeeding."
    },
    {
      username: "biggiesmallsfan",
      tweet: "We can’t change the world unless we change ourselves."
    },
    {
      username: "walefan",
      tweet: "If I woke up tomorrow and didn’t have a dolla, as long as I have my heart, I can get it all over."
    },
    {
      username: "nasfan",
      tweet: "Trust your own judgement, live with it and love it."
    },
    {
      username: "lilwaynefan",
      tweet: "I like people that enjoy life, ’cause I do the same."
    }
  ];
  
  await models.User.bulkCreate(data);
};