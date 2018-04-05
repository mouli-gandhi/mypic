//Required files
const multer = require('multer')
const Picture = require('./../model/galleryModel')
const thumb = require('node-thumbnail')
const path = require('path')

//Retrive uploaded images

exports.showGallery = function(req,res){
	let resultSize=0
	let items = new Array();
	let hasNextPage = false
    Picture.find({},{filename: 1, tags: 1, _id:0 } , function(err,docs){
		if(err)
            console.log('error occured in the database');
	}).sort({"created_date":-1}).cursor().on("data",function(doc)
	{
		resultSize++
		if(resultSize <= 12 ){
			items.push({image:doc.filename,tags:doc.tags})
		}
		else{

			hasNextPage = true
		}
		
	}).on("close",function(){
		
		var obj = {

			items:items,
			hasNextPage:hasNextPage
		}
		obj=JSON.stringify(obj)
		res.render("gallery",{data:obj});			
	})

}


//Search 
exports.searchByTag = function(req,res){
	
	var query = req.params.query;
    Picture.find({tags:{$regex:query}},{filename: 1, tags: 1, _id:0 } , function(err,docs){
		if(err)
            console.log('error occured in the database');
	}).sort({"created_date":-1})
	
}
//Upload Image 
exports.addImage = function(req,res){
	var thumbnail = thumb.thumb;
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './static/uploads')
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
	})
	
    var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
			}
			callback(null, true)
		}
	}).single('imgUpload');
	//Upload function to add image in server directory
	upload(req, res, function(err) {
		  var filename = req.file.filename
		  //Parsing tags
		  var tag = req.body.tags
		  tag = tag.replace(/,\s*$/, "");
		  tag = tag.replace(/,+/, ",")
		  var tags = tag.split(',') 
		  tags.map((val, i) => {
			  tags[i] = val.trim()
		  })
	//Create thumbnail of uploaded image	  
		  thumbnail({
			source: './static/uploads/'+filename,
			destination: './static/uploads/thumb',
			suffix:'',
			width: 350,
			concurrency: 4
		  }, function(files, err, stdout, stderr) {
			 console.log('Thubmail Created..')
		  });	
		  //Insert filename into database	  
		  var insertObj = new Picture({filename:filename,tags:tags})
		  insertObj.save(function(error, data){
			  if(error){
                
			  }
			  else{
				 console.log('Picture added to database')
			  }
		  })		  
		  res.redirect('/')
})
}
