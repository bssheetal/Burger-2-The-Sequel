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
    db.Burger.create({
        name:req.body.name,
        devoured_state:req.body.devoured_state
    }).then(function (data) {
        res.json(data);
    })
});

router.put("/api/burgers/:id", function (req, res) {
    
    db.Burger.update({
        devoured_state:req.body.devoured_state
    },{
        where:{
            id:req.params.id
        }
    }).then(function(data)
    {
        res.json(data);
    })    
});

    module.exports = router;