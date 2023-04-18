module.exports = (sequelize, DataTypes) => {
    const RSOs = sequelize.define("RSOs",
    {
      name:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leader:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      member_2:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      member_3:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      member_4:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      university:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    return RSOs;
  }