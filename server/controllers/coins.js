
const getCoins = (req, res, next) => {
    const dbInst = req.app.get('db');
    let {searchText, sortBy, ascend} = req.query;
    const ascending = ascend == 'true' ? "ASC" : "DESC";

    if(searchText) {
        searchText = searchText.toLowerCase().trim();
    } else {
        searchText = '';
    }

    if(dbInst) {
        // dbInst.getCoins(searchText)

        dbInst.query(`SELECT * FROM coins
        WHERE LOWER(abv_name) LIKE '%${searchText}%' OR LOWER(name) LIKE '%${searchText}%' 
        ORDER BY ${sortBy || 'abv_name'} ${ascending}
        LIMIT 500`)

        .then(resp => {
            console.log('daterz: ', JSON.stringify(resp.length))
            res.status(200).send(resp)
        })
        .catch(err => console.error(`[coins][getCoins] SQL err: ${JSON.stringify(err)}`))
    }
}

module.exports = {
    getCoins

}

