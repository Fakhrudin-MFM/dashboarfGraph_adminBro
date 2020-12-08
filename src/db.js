const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  username: 'root',
  database: 'weather',
  dialect: 'sqlite',
  dialectOptions: {
    multipleStatements: true
  },
  storage: './weather.db',
})

const Weather = sequelize.define('Weather', {
  date: DataTypes.DATEONLY,
  temperature: DataTypes.INTEGER,
  pressure: DataTypes.INTEGER,
  humidity: DataTypes.INTEGER,
  wind: DataTypes.INTEGER
}, {
  timestamps: false
})

sequelize.sync()

module.exports = {
  Weather
}