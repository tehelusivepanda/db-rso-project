module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events",
  {
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_phone:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_email:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Events.associate = (models) => {
    Events.hasMany(models.Reviews, {
      onDelete: "cascade",
    });
  };

  return Events;
};