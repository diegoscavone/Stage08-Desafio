require('express-async-errors')

const AppError = require('./utils/AppError')

const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())

app.use(routes)

//Errors client and server
app.use((error, request, response, next) => {
  if (error instanceof AppError){
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})


const PORT = 3335
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
