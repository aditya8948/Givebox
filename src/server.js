require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');
const PORT = process.env.PORT
const apiRoutes = require('./routes');

const app = express();

//middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes

app.use('/api', apiRoutes);

//health 
app.get('/api/health', (req, res)=>{
    res.status(200).json({message: 'Server is running'});
});


async function startServer(params) {
    try {
        await sequelize.authenticate();
        console.log(' Successfully connected to MySQL database');

        await sequelize.sync();

        app.listen(PORT, () => {
             console.log(` Server running on http://localhost:${PORT}`);
         });

    } catch (error) {
         console.error(' Unable to connect to MySQL:', error.message);
    }
}

startServer();
