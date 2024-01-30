const express = require('express');
const cors = require('cors');
const {connect} = require('mongoose');
require('dotenv').config()
const upload = require('express-fileupload')

const userRouters = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const app = express()



app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: "http://localhost:5000"}))
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/users', userRouters)
app.use('/api/posts', postRoutes)

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URL)
    .then(() => console.log("Connected databse successfully!"))
    .catch((e) => console.log(e))

app.listen(process.env.PORT, () => {
  console.log("Server is running...")  
})