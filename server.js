const { extractTextFromFile, summarizeText, generateQuizQuestions } = require('./summarization');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();
const upload = multer();
const bcrypt = require('bcrypt');

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
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb+srv://samwwise06:1AjdVHl@cop4331cards.6tpx1.mongodb.net/Cop4331?retryWrites=true&w=majority&appName=cop4331Cards';
const client = new MongoClient(url);
client.connect();


app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, fullname, error
    var error = '';
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).json({ error: "All fields must be provided." });
    }
    const db = client.db();
    console.log(await db.stats())
    const hash= await bcrypt.compare(password.trim(), user.Password);
    if (!hash) {
        return res.status(401).json({ id: -1, fullName: '', error: 'Invalid password' });
    }
    const results = await
        db.collection('Users').find({ Login: login.trim(), Password: hash }).toArray();
    var id = -1;
    var fn = '';
    console.log(results)
    if (results.length > 0) {
        id = results[0]._id;
        fn = results[0].fullName;
    }
    else error = 'User not found';
    var ret = { id: id, fullName: fn, error: error };
    res.status(200).json(ret);
});

app.post('/api/signup', async (req, res, next) => {
    // incoming: fullname login, password
    // outgoing: id, fullname, error
    var error = '';
    const { fullName, login, password } = req.body;
    if (!fullName || !login || !password) {
        return res.status(400).json({ error: "All fields must be provided." });
    }
    const db = client.db();
    console.log(await db.stats())
    const hash = await bcrypt.hash(password.trim(), 10);
    const results = await
        db.collection('Users').insertOne({FullName: fullName.trim(), Login: login.trim(), Password: hash });
    if (results.length > 0) {
        error = results.error
    }
    var ret = { error: error };
    res.status(200).json(ret);
});


app.post('/api/search-summaries', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "All fields must be provided." });
    }
    console.log(req.body);
    var _search = search.trim();
    const db = client.db();
    const results = await db.collection('Summaries').find({
        $and: [
            {
                $or: [
                    { "Name": { $regex: _search, $options: "i" } },
                    { "Summary": { $regex: _search, $options: "i" } }
                ]
            },
            { "userId": userId }
        ]}).toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
        _ret.push(
            {
                name: results[i].Name,
                dateCreated: results[i].DateCreated,
                summaryId: results[i]._id
            }
        );
    }
    var ret = { summaries: _ret, error: error };
    res.status(200).json(ret);
});


app.post('/api/get-summary', async (req, res, next) => {
    var error = 'summary not found';
    const { summaryId } = req.body;
    if (!summaryId) {
        return res.status(400).json({ error: "All fields must be provided." });
    }
    console.log(summaryId);
    summaryObjectId = new ObjectId(summaryId);
    const db = client.db();
    const results = await db.collection('Summaries').find({ "_id": summaryObjectId}).toArray();
    console.log(results);
    var summary = "";
    var quiz = '';
    var summaryName = '';
    var summaryDateCreated = '';
    if (results.length > 0) {
        summary = results[0].Summary;
        quiz = results[0].Quiz;
        summaryDateCreated = results[0].DateCreated;
        summaryName = results[0].Name;
    }
    var ret = { summary: summary, quiz: quiz, summaryDateCreated: summaryDateCreated, summaryName: summaryName, error: error };
    res.status(200).json(ret);
});

app.post('/api/process-file', upload.single('file'), async (req, res) => {
  const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "All fields must be provided." });
    }

  try {
      var fileBuffer = req.file.buffer;
    const textData = await extractTextFromFile(fileBuffer);
    console.log(textData);
    //const summary = await summarizeText(textData);
    //const quiz = await generateQuizQuestions(summary);
    const db = client.db();
    const dateCreated = new Date()
    const results = await db.collection('Summaries').insertOne({Name: req.file.originalname, DateCreated: dateCreated, userId: userId, Summary: summary, Quiz: JSON.stringify(quiz)})
      console.log(results);
      res.json({ summary: summary, summaryId: results.insertedId, quiz: quiz, summaryDateCreated: dateCreated.toString(), summaryName: req.file.originalname.toString() });
  } catch (error) {
      console.log(error);
    res.status(500).json({ error: 'Failed to process the file' });
  }
});

app.post('/generate-quiz', async (req, res) =>{
    const { summary } = req.body;

    try{
        //const quiz = await generateQuizQuestions(summary);
        res.json({ quiz });
    }
    catch(error){
        res.status(500).json({error: 'Failed to generate quiz' });
    }
});

app.post('/api/save-quiz-results', async (req, res, next) => {
    // incoming: fullname login, password
    // outgoing: id, fullname, error
    var error = '';
    console.log(req.body);
    const { userId, numCorrect, numQuestions} = req.body;
    let userObjectId = new ObjectId(userId);
    if (!userId || !numCorrect || !numQuestions) {
        return res.status(400).json({ error: "All fields must be provided." });
    }
    let updateData = {
        $inc: {
            numQuestions: numQuestions,
            numQuizzes: 1,
            numCorrect: numCorrect
        },
    };
    console.log(userId, numQuestions, numCorrect);
    const db = client.db();
    console.log(await db.stats());
    const result = await db.collection('Users').updateOne(
        { _id: userObjectId }, // Search for the user by userId
        updateData // Apply the increment and the set operation
    );
    console.log(result);
    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/get-user-data', async (req, res, next) => {
    // incoming: fullname login, password
    // outgoing: id, fullname, error
    var error = '';
    const { userId } = req.body;
    let userObjectId = new ObjectId(userId);
    let userData= {
        fName : "",
        userName : "",
        numCorrect : 0,
        numQuestions : 0,
        numQuizzes : 0,
    }
    if (!userId) {
        return res.status(400).json({ error: "All fields must be provided." });
    }
    const db = client.db();
    const results = await db.collection('Users').find({ "_id": userObjectId}).toArray();
    console.log(results[0]);
    if(results.length > 0) {
        userData.fName= results[0].FullName;
        userData.userName= results[0].Login;
        userData.numCorrect= results[0].numCorrect;
        userData.numQuestions= results[0].numQuestions;
        userData.numQuizzes= results[0].numQuizzes;
    }

    var ret = {userData: userData, error: error };
    res.status(200).json(ret);
});

app.post('/api/change-user-data', async (req, res, next) => {
    var error = '';
    const { userId, fName, password, userName } = req.body;
    console.log(req.body);
    let userObjectId = new ObjectId(userId);
    if (!userId || (!fName && !password)) {
        return res.status(400).json({ error: "All fields must be provided." });
    }
    const db = client.db();
    let updateData= {}
    if(fName !== "" && userName !== "") {
        updateData = {
            $set: {
                FullName: fName,
                Login: userName
            },
        };
    }
    else if( fName !== "" ) {
        updateData = {
            $set: {
                FullName: fName,
            },
        };
    }

    else {
        updateData = {
            $set: {
                login: userName,
            },
        };
    }

    const results = await db.collection('Users').updateOne({ "_id": userObjectId, "Password": password},
        updateData
        );

    var ret = {error: error };
    res.status(200).json(ret);
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

const quiz = {
    "quizQuestions": [
        {
            "question": "What are the two major abiotic factors that shape terrestrial biomes?",
            "options": [
                "A. Sunlight and wind",
                "B. Temperature and precipitation",
                "C. Altitude and soil type",
                "D. Latitude and ocean currents"
            ],
            "answer": "B"
        },
        {
            "question": "Which biome is characterized by high biodiversity and year-round growing conditions?",
            "options": [
                "A. Subtropical Desert",
                "B. Temperate Grassland",
                "C. Tropical Wet Forest",
                "D. Chaparral"
            ],
            "answer": "C"
        },
        {
            "question": "What is the average temperature range of tropical wet forests (rainforests)?",
            "options": [
                "A. 0°C to 20°C",
                "B. 24°C to 29°C",
                "C. 20°C to 34°C",
                "D. -10°C to 15°C"
            ],
            "answer": "C"
        },
        {
            "question": "Which biome is known for having grasses as the dominant vegetation and experiencing extreme seasonal temperature variations?",
            "options": [
                "A. Chaparral",
                "B. Temperate Grassland",
                "C. Savanna",
                "D. Tropical Wet Forest"
            ],
            "answer": "B"
        },
        {
            "question": "Which biome experiences long dry seasons, has scattered trees, and is found in Africa, South America, and northern Australia?",
            "options": [
                "A. Savanna",
                "B. Temperate Forest",
                "C. Chaparral",
                "D. Subtropical Desert"
            ],
            "answer": "A"
        },
        {
            "question": "Which adaptation is common among plants in subtropical deserts?",
            "options": [
                "A. Shallow root systems for absorbing dew",
                "B. Waxy leaves to conserve water",
                "C. Ability to photosynthesize at night",
                "D. Thick bark to prevent fire damage"
            ],
            "answer": "B"
        },
        {
            "question": "In which biome are fires an important ecological disturbance, helping to maintain the landscape and promote plant regrowth?",
            "options": [
                "A. Temperate Grassland",
                "B. Tropical Wet Forest",
                "C. Subtropical Desert",
                "D. Tundra"
            ],
            "answer": "A"
        },
        {
            "question": "What factor allows chaparral plants to thrive despite frequent fires?",
            "options": [
                "A. Thick leaves that resist burning",
                "B. Deep water storage in roots",
                "C. Fire-adapted seeds and nutrient-rich ash",
                "D. Seasonal migration of pollinators"
            ],
            "answer": "C"
        },
        {
            "question": "What is the average annual rainfall in subtropical deserts?",
            "options": [
                "A. Less than 30 cm",
                "B. 65-75 cm",
                "C. 125-660 cm",
                "D. 25-75 cm"
            ],
            "answer": "A"
        },
        {
            "question": "In which biome are epiphytes commonly found, and why?",
            "options": [
                "A. Savanna, due to sparse rainfall",
                "B. Temperate Grassland, because of rich soils",
                "C. Tropical Wet Forest, for sunlight access",
                "D. Subtropical Desert, due to dry conditions"
            ],
            "answer": "C"
        }
    ]
}
