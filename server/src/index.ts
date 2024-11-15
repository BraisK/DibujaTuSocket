import { Server } from "socket.io";
import express from 'express'
import http from 'http'
import cors from 'cors'


const app = express()
const server = http.createServer(app)
app.use(cors())
const io = new Server(server,
    {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })


io.on('connection', socket => {
    console.log('un nuevo cliente se conectó')
    socket.on('disconnect', () => {
        console.log('el cliente se desconectó')
    })

    socket.on('dibujar', (info) => {
        console.log('Me envia datos un cliente:', info)
        socket.emit('hanDibujado', info)
    })
})

server.listen(3000, () => {
    console.log('Servidor encendido en el puerto 3000')
}
)