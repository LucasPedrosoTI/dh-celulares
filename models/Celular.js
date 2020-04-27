module.exports = (sequelize, DataType) => {
  const Celular = sequelize.define(
    "Celular",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: DataType.STRING,
      preco: DataType.DECIMAL(10, 2),
      img: DataType.STRING,
    },
    {
      tableName: "celulares",
      timestamps: false,
    }
  );

  return Celular;
};
