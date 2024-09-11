import express from 'express';
import path from 'path';
import url from 'url';
import translate from 'translate';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// set up EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  static file setup
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { translatedText: '' });
});

// handle POST request to translate text
app.post('/', async (req, res) => {
    const { text } = req.body;
    let translatedText = '';

    if (text) {
        try {
            translatedText = await translate(text, {
                from: 'en',
                to: 'bn'
            });
        } catch (error) {
            console.error('Translation error:', error);
            translatedText = 'Error translating text.';
        }
    }

    res.render('index', { translatedText });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
