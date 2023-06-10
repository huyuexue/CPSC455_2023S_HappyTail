const fetch = require('node-fetch');

exports.Test= (req, res) => {
  // Validate request
    res.status(200).send({
      message: "ok"
    });
    return;
};