const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    tweet: DataTypes.STRING,
  });


  User.findByUsername = async username => {
    let user = await User.findOne({
      where: { username }
    });
    return user;
  };

  return User;
};

export default user;
