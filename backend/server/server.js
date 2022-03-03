import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import dbConfig from "./config/db.config"
import db from "./models"

// routes
import adminRoute from "./routes/admin.routes";
import authRoute from "./routes/auth.routes";
import userRoute from "./routes/user.routes";
import newsRoute from "./routes/news.routes";
import coinRoute from "./routes/coin.routes";
import orderRoute from "./routes/order.routes";
import sellRoute from "./routes/sell.routes";

// import INITIAL_ADMIN_DATA from "./data/admin.json";
// import INITIAL_USER_DATA from "./data/old.json";
// var bcrypt = require("bcryptjs");
// const User = db.user;

const CURRENT_WORKING_DIR = process.cwd();
const app = express();
require('dotenv').config();

const FRONT_URL = process.env.FRONT_URL;

var corsOptions = {
origin: FRONT_URL,
expose: [
  "WWW-Authenticate",
  "Server-Authorization",
  "Content-Range" // <<--- HERE
],
};

//app.use(cors(corsOptions))   
app.use(cors({origin: true}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use('/', adminRoute);
app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', newsRoute);
app.use('/', coinRoute);
app.use('/', orderRoute);
app.use('/', sellRoute);

const fileRoute = require('./routes/file');
app.use(fileRoute);


const Role = db.role;
const mongouri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
console.log(mongouri);

db.mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  let i = 0;
  // for(i in INITIAL_ADMIN_DATA){
  //   INITIAL_ADMIN_DATA[i].password = bcrypt.hashSync(INITIAL_ADMIN_DATA[i].password, 8);
  //   User( INITIAL_ADMIN_DATA[i] ).save()
  //   .then()
  //   .catch(err=>{
  //     console.log(err._message);
  //   })
  // }
  // i = 0;
  // for(i in INITIAL_USER_DATA){
  //   User( INITIAL_USER_DATA[i] ).save()
  //   .then()
  //   .catch(err=>{
  //     console.log(err._message);
  //   })
  // }
}
