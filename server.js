/********************************************************************************* 
 * WEB322 – Assignment 02
 * *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html 
 * Name: Arth Patel  Student ID: 141716225    Date: 2024-2-03
 * *******************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets');

const app = express();
const port = 8080; // You can change this to any available port

// Ensure legoData.initialize() has completed successfully before starting the server
app.use(express.static(path.join(__dirname, 'public')));
legoData.initialize()
  .then(() => {
    // Define routes after legoData has been initialized

    // GET "/"
    app.get('/', (req, res) => {
      res.send('Assignment 2: Arth Patel - 141716225');
    });

    // GET "/lego/sets"
    app.get('/lego/sets', (req, res) => {
      legoData.getAllSets()
        .then(allSets => res.json(allSets))
        .catch(error => res.status(500).send(`Error: ${error}`));
    });

    // GET "/lego/sets/num-demo"
    app.get('/lego/sets/num-demo', (req, res) => {
      const setNum = 'TRUJOKERMECH-1'; // Replace with a known setNum from your data set
      legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(error => res.status(500).send(`Error: ${error}`));
    });
      app.use((req, res) => {
          res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
      });
    // GET "/lego/sets/theme-demo"
    app.get('/lego/sets/theme-demo', (req, res) => {
      const theme = 'Iron Man'; // Replace with a known theme value from your data set
      legoData.getSetsByTheme(theme)
        .then(sets => res.json(sets))
        .catch(error => res.status(500).send(`Error: ${error}`));
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Server is running on http://localhost:${port}/lego/sets`);
      console.log(`Server is running on http://localhost:${port}/lego/sets/num-demo`);
      console.log(`Server is running on http://localhost:${port}/lego/sets/theme-demo`);
    });
  })
  .catch(error => {
    console.error(`Initialization error: ${error}`);
  }); 