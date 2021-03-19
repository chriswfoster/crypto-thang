const { getCoins } = require("../controllers/coins")
const { getTags, createTag, deleteTag } = require("../controllers/tags")

module.exports = (router) => {
    router.get('/getTags', getTags)
    router.post('/createTag', createTag)
    router.delete('/deleteTag', deleteTag)
    router.get('/getCoins', getCoins)
    return router;
}