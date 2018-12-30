var express=require("express");

var router=express.Router();
var burger=require("../models/burger.js");

router.get("/",function(req,res)
{
    burger.all(function(data)
    {
        var hbsobject={
            burgers:data
        };
        console.log(hbsobject);
        //res.send(hbsobject);
        res.render("index",hbsobject);
    });
});

router.post("/api/burgers",function(req,res)
{
    burger.create([
        "burger_name"
    ],[req.body.burger_name],function(result)
    {
        
        res.redirect('/');
    });
});

router.put("/api/burgers/:id",function(req,res)
{
    var id=req.params.id;
    res.json(id);
    burger.update({
        devoured:true
    },id,function(result)
    {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    });

});
module.exports=router;