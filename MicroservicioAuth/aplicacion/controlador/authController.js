const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../../infraestructura/conexion/db')
const {promisify} = require('util')

//procedimiento para registrarnos
exports.register = async(req, res)=>{

    try {
        const {user, name, pass} = req.body
        let passHash = await bcryptjs.hash(pass, 8)
        //console.log(passHash)
        conexion.query('INSERT INTO users SET ?', {user: user, name: name, pass: passHash}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/')
            console.log("Usuario: "+ user +" registrado correctamente.")
        })
    } catch (error) {
        console.log(error)
    }
    
}

//procedimiento oara login
exports.login = async(req, res)=>{
    try {
        const {user, pass} = req.body   
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
                    //inicio de sesion correcto
                    const id = results[0].id
                    const token = jwt.sign({id:id}, "grupoCinco")
                    console.log("TOKEN: "+token+" para el usuario: "+user)

                    const cookiesOptions = {
                        expires: new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                })
    }catch (error) {
        console.log(error)
    }
}

//procedimiento para autenticar
exports.isAuthenticated = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, "grupoCinco")
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

//para cerrar sesion
exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}
