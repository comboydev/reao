import express from 'express'
import path, { dirname } from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import db from "./models"
// routes
import adminRoute from "./routes/admin.routes";
import userRoute from "./routes/user.routes";
import imageRoute from "./routes/image.routes";
import coinRoute from "./routes/coin.routes";
import { fileURLToPath } from 'url'

const config = require('./config');

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

const app = express();
app.use(cors(corsOptions));
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));       //max upload request size 50mb
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, '../..')))

app.use(adminRoute);
app.use(userRoute);
app.use(imageRoute);
app.use(coinRoute);

const mongouri = `mongodb://${config.mongodb.HOST}:${config.mongodb.PORT}/${config.mongodb.DB}`;
db.mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
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

