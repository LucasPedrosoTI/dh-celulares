module.exports = (sequelize, DataType) => {
  const Celular = sequelize.define(
    "Celular",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataType.STRING,
        allowNull: false,
      },
      preco: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
      },
      img: DataType.STRING,
    },
    {
      tableName: "celulares",
      timestamps: false,
    }
  );

  return Celular;
};
