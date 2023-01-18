
//Define __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Server Configuration
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
const app = express();
const port = 3000;


//Recources
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/images'));

//Views
app.use(expressEjsLayouts);
app.set('views', __dirname + '/views');
app.set('layout', 'Shared/Layout');
app.set('view engine', 'ejs');


//Page Functions
app.get('/', (req, res) => {
    res.render("GamePage", { title: 'Game Page!' });
});

app.get('/AboutPage', (req, res) => {
    res.render("AboutPage", { title: 'About Me!' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })