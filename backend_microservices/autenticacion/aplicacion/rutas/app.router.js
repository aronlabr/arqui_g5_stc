const express = require('express')
const router = express.Router()

const authController = require('../controlador/authController')

//router para los metodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router
