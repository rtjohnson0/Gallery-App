var express = require("express");
var mongoose = require("mongoose");
require('dotenv').config()
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	uri = process.env.ATLAS_URI  // connection string for Atlas here  
  } else {
	uri = process.env.LOCAL_URI   // connection string for localhost mongo here  
  }
  
  // connection to database
  mongoose.connect(process.env.ATLAS_URI, { 
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true 
  });
  const connection = mongoose.connection;
  connection.once('open', () => {
	console.log("MongoDB connection is live");
  })

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
