module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews",
    {
      username:
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comment:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating:
      {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 10
        }
      },
    });

    return Reviews;
  }