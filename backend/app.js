const express = require('express')
const app = express()
const cors = require('cors')
const listRoutes = require('./routes/list')
const loginRoutes = require('./routes/login')
app.use(cors())
app.use(express.json())

//routes list
app.use('/list', listRoutes)
//routes login
app.use('/login', loginRoutes)
//route du racine
app.use('/',(req, res) => {
    res.send('Congratulation, server found')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))