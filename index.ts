import { Server } from './server/server'
import { carRouter } from './car/car.router'

const server: Server = new Server

server.bootstrap([carRouter]).then(server => {
    console.log(`Servidor executando na porta ${server.app.address().port}`)
}).catch( error => {
    console.log(`Servidor nao foi iniciado pois: ${error}`)
    process.exit(1)
})