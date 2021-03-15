const axios = require('axios');
require('dotenv').config();




const hitCoinMarketCapLatest = () => {
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_KEY}
    })
    .then(resp => {
        console.log(resp.data);
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