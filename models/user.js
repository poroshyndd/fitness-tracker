module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    name: {
      type: DataTypes.STRING, allowNull: false
    },
    email: {
      type: DataTypes.STRING, allowNull: false, unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING, allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT, allowNull: true
    },
    height: {
      type: DataTypes.FLOAT, allowNull: true
    },
    age: {
      type: DataTypes.INTEGER, allowNull: true
    },
    goal: {
      type: DataTypes.STRING, allowNull: true
    }
  }, {
    tableName: 'users', timestamps: false
  })
}
