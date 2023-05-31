const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const server = express()
const cors = require('cors')

server.use(cors())
server.use(express.json())

server.get('/veiculos', async (req, res)=>{
    const veiculos = await prisma.veiculos.findMany()
    return res.json(veiculos)
})


server.post('/veiculos', async (req, res)=>{
    const veiculoPlaca = await prisma.veiculos.findUnique({
        where: {
            placa: req.body.placa
        }
    })

    if (veiculoPlaca) {
        return res.status(500).json({msg: 'Placa já cadastrada'})
    }else{
        const veiculoBody = req.body
        const veiculo = await prisma.veiculos.create({
            data: veiculoBody
        })
        return res.json(veiculo)
    }
})

server.delete('/veiculos/:placa', async (req,res)=>{
        const veiculo = await prisma.veiculos.delete({
        where: {
            placa: req.params.placa
        }
    })
    
    return res.json(veiculo)
})



server.put('/veiculos/:placa', async (req, res)=>{
    const veiculo = await prisma.veiculos.update({
        data: req.body, 
        where: {
            placa: req.params.placa
        }
    })

    return res.json(veiculo)
})

server.listen(3333)