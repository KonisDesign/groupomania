module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    Posts.associate = (models) => {
      Posts.hasMany(models.Likes, {
        onDelete: "cascade",
      });
  
      Posts.hasMany(models.Likes, {
        onDelete: "cascade",
      });
    };
    return Posts;
  };