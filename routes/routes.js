const router = require("express").Router();
const controller = require("./controller");

router.get("/client", controller.getClient);



module.exports = router;