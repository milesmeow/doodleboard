var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/doodleboard");


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('We are connected to mongodb!');
});

// data is actually and array of objects
var drawingSchema = mongoose.Schema({
  drawingID: {type: String, required:true},
  data: {type:Array, required:true}
});

var Drawing = mongoose.model('drawing', drawingSchema);

const Mongoose = {
  saveToDB : function (drawingID, data) {
    return new Promise( (resolve, reject) => { 
      let d = new Drawing( {drawingID, data});
      d.save( (err, doc) => {
        if (err) {
          console.log('database error: ', err);
          reject(err);
        } else {
          console.log('database updated: ', doc);
          resolve(doc);
        }
      }); 
    })
  }
} 


module.exports = Mongoose;