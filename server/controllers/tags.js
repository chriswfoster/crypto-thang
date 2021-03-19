


const getTags = (req, res, enxt) => {
    const dbInst = req.app.get('db');
    if (dbInst) {
        dbInst.getTags()
        .then(resp => {
            res.status(200).send(resp);
        })
        .catch(err => {
            console.error(`[tags][getTags] SQL err: ${JSON.stringify(err)}`);
        })
    }
}

const createTag = (req, res, next) => {
    const dbInst = req.app.get('db');
    const {name} = req.query;
    if(dbInst && name) {
        dbInst.createTag(name)
        .then(resp => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.err(`[tags][createTag] SQL err: ${JSON.stringify(err)}`);
        })
    }
}

const deleteTag = (req, res, next) => {
    const dbInst = req.app.get('db');
    const {id} = req.query;
    if(dbInst && id) {
        dbInst.deleteTag(id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => console.err(`[tags][deleteTag] SQL err: ${JSON.stringify(err)}`))
    }
}

module.exports = {
    getTags,
    createTag,
    deleteTag

}