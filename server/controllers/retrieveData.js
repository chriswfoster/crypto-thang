const axios = require('axios');
require('dotenv').config();
const Async = require('async');
const { Provider } = require('react-redux');




const hitCoinMarketCapLatest = (dbInst) => {
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_KEY}
    })
    .then(resp => {
        console.log(resp.data.data.length);
        let updateObj = {};
        let createObj = {};
        
        getCoins()

        function getCoins() {
            Async.eachSeries(resp.data.data, (coin, cb) => {
                dbInst.findCoinByAbv(coin.symbol)
                .then(cSearch => {
                    // console.log(cSearch)
                    if(cSearch.length > 0) {
                        if(!cSearch[0].name || (!cSearch[0].public_date && coin.date_added)) {
                            updateObj[cSearch[0].abv_name] = {sqlObj: {...cSearch[0]}, apiObj: {...coin}}
                        }
                    } else {
                        createObj[coin.symbol] = {...coin}
                    }
                    cb(null, true);
                })
            }, (err) => {
                if(err) {
                    console.error(`[hitCoinMarketCapLatest] Error getting aSync Data`)
                } else {
                    updateCoins();
                }
            })
        }

        function updateCoins() {
            // console.log(Object.values(updateObj))
            Async.eachSeries(Object.values(updateObj), (coin, cb) => {
                const {sqlObj, apiObj} = coin;
                const { abv_name, id} = sqlObj;
                const { name: incName, date_added } = apiObj;
                dbInst.coins.save({id: id, name: incName, public_date: date_added})
                    .then(result => {
                        cb(null, true);
                        // do something else for now?
                        // update price now?
                    })
                    .catch(err => {
                        let errMsg = `[hitCoinMarketCapLatest][updateCoins] Error updating coins ${JSON.stringify(err)}`;
                        cb(errMsg);
                    })
        
            }, (err) => {
                if(err) {
                    console.error(`[hitCoinMarketCapLatest][updateCoins] Error updating coins ${JSON.stringify(err)}`)
                } else {
                    createCoins();
                }
            })
        }

        function createCoins(){
            Async.eachSeries(Object.values(createObj), (coin, cb) => {
                const {name, symbol, date_added} = coin
                dbInst.coins.insert({abv_name: symbol, name: name, public_date: date_added})
                .then(resp => {
                    // I think it went well, do price yet??
                    cb(null, true);
                })
                .catch(err => {
                    let errMsg = `[hitCoinMarketCapLatest][createCoins] Error creating coins ${JSON.stringify(err)}`;
                    cb(errMsg);
                })
            }, (err) => {
                if(err) {
                    console.error(`[hitCoinMarketCapLatest][createCoins] Error creating coins ${JSON.stringify(err)}`)
                } else {
                    // what's next?
                }
            })
        }
    })
    .catch(err => {
        console.error(`Error getting CoinMarketCap latest: ${err}`);
    })
}

const hitNomicsLatest = (dbInst) => {
    axios.get(`https://api.nomics.com/v1/prices?key=${process.env.NOMICS_API_KEY}`)
    .then(resp => {
        console.log(resp.data);
        //   { currency: 'ABT', price: '0.15932687' },
        // dbInst.coins.update(resp.data.map)
        let coinObj = {}
        resp.data.forEach(coin => {
            coinObj[coin.currency] = {price: coin.price};
            dbInst.findCoinByAbv(coin.currency)
            .then(cSearch => {
                if(cSearch.length < 1) {
                    coinObj[coin.currency].create = true;
                    dbInst.coins.insert({abv_name: coin.currency}).then(cInsert => {
                        console.log('this is c insert: ', cInsert)
                        coinObj[cInsert.abv_name].id = cInsert.id
                    })
                } else {
                    coinObj[coin.currency].id = cSearch.id
                }
                // console.log(resp)
            })
            .catch(err => console.error(err))
            // dbInst.coins.save({abv_name: coin.currency},)
        })
    })
    .catch(err => {
        console.error(`Error getting Nomics latest: ${err}`);
    })
}

module.exports = {
    hitCoinMarketCapLatest,
    hitNomicsLatest
}