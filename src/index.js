const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')
AdminBro.registerAdapter(AdminBroSequelize)

const express = require('express')
const PORT = 8080
const app = express()

const { Weather } = require('./db')


const adminBro = new AdminBro({
  databases: [Weather],
  rootPath: '/admin',
  dashboard: {
    handler: async () => Weather.findAll(),
    component: AdminBro.bundle('./components/MyDashboard')
  }
})
const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'some@mail.com',
  password: process.env.ADMIN_PASS || '123qwe',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
    return null
  },
  cookieName: process.env.ADMIN_COOKIE_NAME || 'adminbro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'somePassword',
})


app.use(adminBro.options.rootPath, router)
app.listen(PORT, () => console.log(`AdminBro is under localhost:${PORT}/admin`))