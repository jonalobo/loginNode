const express = require('express')

const app = express()

const PORT = 8080

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hola')
})

const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
server.on(Error,(error)=>{
    console.log(error)
})