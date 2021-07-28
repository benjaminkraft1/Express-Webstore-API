import express from 'express';
import { routes } from './backend/routes';
import bodyParser from 'body-parser'
import logger from './utilities/logger';

const app: express.Application = express()

// Setup port to 3000
const port = 3000;

// Start server
app.listen(port, () => {
    console.log(`Webstore Server started at localhost:${port}`);
  });

// app.use(bodyParser.json())

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!')
})

// Use router defined in another file
//app.use('/api', routes);


app.use(express.json());
// console log all requests
app.use(logger);
// set routes
routes(app);
