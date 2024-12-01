const { extractTextFromFile, summarizeText, generateQuizQuestions } = require('./summarization');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();
const upload = multer();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});
app.listen(5000); // start Node + Express server on port 5000

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://samwwise06:1AjdVHl@cop4331cards.6tpx1.mongodb.net/Cop4331?retryWrites=true&w=majority&appName=cop4331Cards';
const client = new MongoClient(url);
client.connect();


app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, fullname, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db();
    console.log(await db.stats())
    const results = await
        db.collection('Users').find({ Login: login, Password: password }).toArray();
    var id = -1;
    var fn = '';
    if (results.length > 0) {
        id = results[0]._id;
        fn = results[0].fullName;
    }
    var ret = { id: id, fullName: fn, error: '' };
    res.status(200).json(ret);
});

app.post('/api/signup', async (req, res, next) => {
    // incoming: fullname login, password
    // outgoing: id, fullname, error
    var error = '';
    const { fullName, login, password } = req.body;
    const db = client.db();
    console.log(await db.stats())
    const results = await
        db.collection('Users').insertOne({FullName: fullName, Login: login, Password: password });
    if (results.length > 0) {
        error = results.error
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/getquiz', async (req, res, next) => {
    var ret = { quiz: "question 1 ::: {answer 1} ::: answer 2 ::: answer 3 ;;; question 2 ::: answer 1 ::: {answer 2} ::: answer 3 ;;;question 3 ::: answer 1 ::: answer 2 ::: {answer 3}" };
    res.status(200).json(ret);
});

/*
app.post('/api/addcard', async (req, res, next) => {
    // incoming: userId, color
    // outgoing: error
    const { userId, card } = req.body;
    const newCard = { Card: card, UserId: userId };
    var error = '';
    try {
        const db = client.db();
        const result = db.collection('Cards').insertOne(newCard);
    }
    catch (e) {
        error = e.toString();
    }
    //cardList.push(card);
    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    var _search = search.trim();
    const db = client.db();
    const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*' } }).toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
        _ret.push(results[i].Card);
    }
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});
*/

app.post('/api/process-file', upload.single('file'), async (req, res) => {
  const { file } = req.body;

  try {
      var fileBuffer = req.file.buffer;
    const textData = await extractTextFromFile(fileBuffer);
    console.log(textData);
    //const summary = await summarizeText(textData);
    //const quiz = await generateQuizQuestions(summary);
    res.json({ summary });
  } catch (error) {
      console.log(error);
    res.status(500).json({ error: 'Failed to process the file' });
  }
});

app.post('/generat-quiz', async (req, res) =>{
    const { summary } = req.body;

    try{
        //const quiz = await generateQuizQuestions(summary);
        res.json({ quiz });
    }
    catch(error){
        res.status(500).json({error: 'Failed to generate quiz' });
    }
});


const summary = "Biomes Overview\n" +
    "Biomes are large ecosystems categorized into two major groups: terrestrial (land-based) and aquatic (ocean and freshwater). The key factors determining the distribution and characteristics of biomes are temperature and precipitation.\n" +
    "\n" +
    "Learning Objectives\n" +
    "Understand the two major abiotic factors shaping terrestrial biomes.\n" +
    "Recognize characteristics of eight major terrestrial biomes.\n" +
    "Examine how abiotic factors influence plant and animal life in aquatic biomes.\n" +
    "Compare characteristics of different ocean zones and freshwater biomes.\n" +
    "Terrestrial Biomes Characteristics\n" +
    "Terrestrial ecosystems vary widely, grouped into biomes based on temperature, precipitation, and geographic location. Major differences exist even within the same biome, like deserts—where vegetation can range from abundant (e.g., Sonoran Desert) to sparse (e.g., Boa Vista). Temperature and precipitation fluctuations help determine the plant and animal life of a biome. Some biomes, like tropical wet forests, have stable, year-round growing conditions, while others, like deserts, face extreme temperatures and limited water.\n" +
    "\n" +
    "The Eight Major Terrestrial Biomes\n" +
    "Tropical Wet Forests (Rainforests): Found in equatorial regions, with temperatures ranging from 20°C to 34°C. They receive high rainfall (125-660 cm annually) and are characterized by evergreen vegetation, minimal seasonal temperature variation, and high biodiversity. These forests feature multiple plant layers, including epiphytes, and host a wide variety of animals.\n" +
    "\n" +
    "Savannas: Grasslands with scattered trees, located in Africa, South America, and northern Australia. Savannas experience high temperatures (24°C to 29°C) and 10-40 cm of rainfall annually, with a long dry season. Vegetation includes grasses and forbs, with well-developed root systems to recover after fires.\n" +
    "\n" +
    "Subtropical Deserts: Found between 15° and 30° latitude, these deserts experience extreme temperature fluctuations (up to 60°C by day, 0°C at night) and receive less than 30 cm of rainfall per year. Plant life is adapted to conserve water, and animals are often nocturnal or burrow to avoid heat.\n" +
    "\n" +
    "Chaparral: Found in regions like California, the Mediterranean, and southern Australia, this biome receives 65-75 cm of rainfall, mostly in winter. Summers are dry, and vegetation is dominated by shrubs adapted to fire. Some plants require fire for seed germination, and the soil benefits from nutrients released by fires.\n" +
    "\n" +
    "Temperate Grasslands: Known as prairies in North America and steppes in Eurasia, these biomes experience extreme seasonal temperature variation (hot summers, cold winters). They receive 25-75 cm of rainfall annually, with grasses being the dominant vegetation. Fires are a natural disturbance, and the fertile soil supports grazing animals.\n" +
    "\n" +
    "Temperate Forests: (Not fully detailed in the provided text.)\n" +
    "\n" +
    "Summary\n" +
    "Biomes are influenced primarily by temperature and precipitation, with variations in these factors affecting plant and animal life. Tropical wet forests have year-round growth due to stable temperatures and high rainfall, while other biomes like deserts and tundras feature low productivity due to harsh conditions. Each biome supports distinct plant and animal adaptations to survive its particular climate."

const quiz = " ;question;\n" +
    "What are the two main abiotic factors that determine the distribution of biomes?\n" +
    ":ans: Wind and soil composition\n" +
    ":ans: Temperature and precipitation\n" +
    ":ans: Sunlight and humidity\n" +
    ";cor; Temperature and precipitation\n" +
    "\n" +
    ";question;\n" +
    "Which biome is characterized by high biodiversity, evergreen vegetation, and minimal seasonal temperature variation?\n" +
    ":ans: Savannas\n" +
    ":ans: Temperate grasslands\n" +
    ";cor; Tropical wet forests (rainforests)\n" +
    "\n" +
    ";question;\n" +
    "What is a common feature of savannas?\n" +
    ":ans: High rainfall year-round\n" +
    ":ans: Large trees that dominate the landscape\n" +
    ";cor; Grasslands with scattered trees and a long dry season\n" +
    "\n" +
    ";question;\n" +
    "Which of the following best describes subtropical deserts?\n" +
    ":ans: A high diversity of plant life, with consistent rainfall throughout the year\n" +
    ":ans: Temperatures that remain stable with little variation\n" +
    ";cor; Extreme temperature fluctuations with very little rainfall\n" +
    "\n" +
    ";question;\n" +
    "What is a unique adaptation of plants in the chaparral biome to cope with fire?\n" +
    ":ans: Roots that grow deeper into the soil to store water\n" +
    ";cor; Seeds that require fire to germinate\n" +
    ":ans: Large leaves to retain water during droughts\n" +
    "\n" +
    ";question;\n" +
    "How does precipitation in temperate grasslands compare to that in tropical wet forests?\n" +
    ":ans: Temperate grasslands receive far more rainfall throughout the year\n" +
    ":ans: Precipitation in temperate grasslands is higher but with no seasonal variation\n" +
    ";cor; Temperate grasslands receive less rainfall, which varies seasonally\n" +
    "\n" +
    ";question;\n" +
    "What is a characteristic of the vegetation in tropical wet forests?\n" +
    ":ans: Sparse, drought-resistant shrubs\n" +
    ":ans: Evergreen trees that lose their leaves seasonally\n" +
    ";cor; Broad-leaved evergreen trees that remain green year-round\n" +
    "\n" +
    ";question;\n" +
    "In which biome are plants typically adapted to survive extreme heat by storing water?\n" +
    ":ans: Tropical wet forests\n" +
    ":ans: Chaparral\n" +
    ";cor; Subtropical deserts\n" +
    "\n" +
    ";question;\n" +
    "Which biome is known for supporting grazing animals due to its fertile soil enriched by deep root systems?\n" +
    ":ans: Tropical wet forests\n" +
    ";cor; Temperate grasslands\n" +
    ":ans: Subtropical deserts\n" +
    "\n" +
    ";question;\n" +
    "Which of the following biomes has the highest biodiversity?\n" +
    ":ans: Savannas\n" +
    ":ans: Chaparral\n" +
    ";cor; Tropical wet forests (rainforests)"