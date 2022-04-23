const { getDomains } = require('../services/getDomains');

exports.getData = async (req, res) => {

    let data = await getDomains(req.params.domain);
    res.status(200).send(data);
}