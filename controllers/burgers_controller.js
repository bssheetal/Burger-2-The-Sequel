var express = require("express");
var db = require("../models");
var router = express.Router();



router.get("/",function(req,res)
{
    res.sendFile(path.join(__dirname,"public/index.html"));
})

router.get("/api/burgers", function (req, res) {
    db.Burger.findAll({}).then(function (data) {
        res.json(data);
    })

});
router.post("/api/burgers", function (req, res) {
    db.Burger.create(req.body).then(function (data) {
        res.json(data);
    })
});

router.put("/api/burgers/:id", function (req, res) {
    var id = req.params.id;
    res.json(id);
    burger.update({
        devoured: true
    }, id, function (result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });

});
module.exports = router;