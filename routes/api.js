var express = require('express');
var router = express.Router();
var app=express();

router.all('/callFun/:p1/:p2', function(req, res, next) {
    console.log(req.body);
    console.log(req.params);
    var module=req.params.p1;
    var functionName=req.params.p2;
    try {
        var run=require('./modules/'+module);
        console.log('./modules/'+module)
        console.log('run',run);
        console.log("++++++",functionName);
        run[functionName](req,res);
    }
    catch (e){
        console.log(e);
        res.json({err:404,errDesc:'url错误 ！'});
    }
    //app.use('/users', users);
    //var list=[{id:1,name:'Bob'}];
    //res.json(list);
});

module.exports = router;