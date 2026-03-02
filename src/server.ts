import express from 'express'
import cors from 'cors'
import router from './api/routes'
import swaggerRouter from './api/routes/swagger'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middleware para fazer parse do JSON
app.use(express.json())

// Configurar CORS para todos os acessos
app.use(cors())

app.use('/', router)
app.use('/docs', swaggerRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})