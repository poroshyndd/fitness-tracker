module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Training', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    intensity: {
      type: DataTypes.ENUM('Niska','Średnia','Wysoka'),
      defaultValue: 'Średnia'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'trainings',
    timestamps: false
  })
}
