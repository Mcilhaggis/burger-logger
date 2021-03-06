//Import the express file
const express = require('express');;
const router = express.Router();

// Import the burger.js file 
const burger = require('../models//burger.js')


// Create the router for the app, and export the router at the end of your file.
// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
    burger.selectAll((data) => {
      const hbsObject = {
        burgers: data,
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });
  
  router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.body.name, req.body.devoured], (result) => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    console.log('condition', condition);
  
    burger.updateOne(
      {
        devoured: req.body.devoured,
      },
      condition,
      (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          console.log("not connecting to db")
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
  
  router.delete('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    burger.deleteOne(condition, (result) => {
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;