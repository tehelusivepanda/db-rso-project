module.exports = (sequelize, DataTypes) => {
  const Universities = sequelize.define("Universities",
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
    location:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_students:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Universities.associate = (models) => {
    Universities.hasMany(models.RSOs, {
      onDelete: "cascade",
    });
  };

  return Universities;
}