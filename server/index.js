const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const massive = require('massive');
const router = express.Router();
const routes = require('./routes')
const {
    hitNomicsLatest,
    hitCoinMarketCapLatest
} = require('./controllers/createCoins')

require('dotenv').config();
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const app = express();
app.use(cors());
app.use(json());
app.use('/api', router)

app.use('/', router);
routes(router)

const port = 3133;
let dbInstance;
massive({
    // connectionString: process.env.PG_SQL_URI, 
    host: '192.168.1.100',
    port: 5432,
    database: 'postgres',
    user: process.env.PG_LOCAL_USER,
    password: process.env.PG_LOCAL_PW,
    rejectUnauthorized: false, 
    ssl: false
})
.then(massiveInstance => {
    dbInstance = massiveInstance
    // dbInstance.coins.insert({abv_name: 'sdfadf', name: 'testeroo'})
    app.set('db', dbInstance);
    // hitNomicsLatest(dbInstance)
    hitCoinMarketCapLatest(dbInstance)
})
.catch(err => {
    console.error(`An error occurred connecting to SQL: ${JSON.stringify(err)}`)
})
// hitNomicsLatest()
// hitCoinMarketCapLatest()
app.listen(port, () => console.log(`Listening on port ${port}`));