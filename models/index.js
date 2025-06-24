const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect:  'postgres',
  protocol: 'postgres',
  logging:  false
})

const Training = require('./training')(sequelize, DataTypes)
const User     = require('./user')(sequelize, DataTypes)

Training.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Training,    { foreignKey: 'user_id' })

module.exports = {
  sequelize,
  Training,
  User
}
