import express, {Application} from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'
import dotenv from 'dotenv'
import connectDB from './db/connect'
import path from 'path'
import {auth} from 'express-openid-connect'
import swaggerJSON from './swagger.json'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

dotenv.config();

const app: Application = express();
const swaggerDefinition = swaggerJSON;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))

const options = {
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.ts'],
  swaggerDefinition
};

const port = process.env.PORT || 8080;
app.listen(port, async () =>{
    console.log(`Server running on port ${port}`);
    await connectDB();
});

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static('public'));

// App
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, E-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use('/', routes)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.redirect('https://jewelry-cataloger.herokuapp.com/api-docs')
  } else {
    res.render('index', {
      title: 'Welcome to Jewelry Cataloger'
    });
  }
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

  

