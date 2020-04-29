module.exports = (sequelize, DataType) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
      },
      senha: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return Admin;
};
