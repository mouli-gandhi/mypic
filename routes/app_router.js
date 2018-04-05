module.exports = function(app) {

const controller = require('./../controller/appController.js')
  
app.get("/",controller.showGallery);
app.get('*',function(req,res){
    res.render('error',{err:'Sorry Invalid URL'}) });

app.post("/addImage", controller.addImage)
};