const express = require('express');
const jsondata = require('./db.json');
const app = express();
app.use(express.json());

// Create (POST) a new item
app.post('/items/add', (req, res) => {
  const newItem = req.body;
  jsondata.push(newItem);
  res.status(201).json(newItem);
});

// Read (GET) all items
app.get('/items', (req, res) => {
  res.json(jsondata);
});

// Read (GET) a specific item by ID
app.get('/items/read/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = jsondata.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});

// Update (PUT) an item by ID
app.put('/items/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = jsondata.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    jsondata[index] = { ...jsondata[index], ...updatedItem };
    res.json(jsondata[index]);
  }
});

// Delete (DELETE) an item by ID
app.delete('/items/delete/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const index = jsondata.findIndex((item) => item.id === id);
      if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        const deletedItem = jsondata.splice(index, 1);
        res.json(deletedItem[0]);
      }
});

app.delete('/items/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = jsondata.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    const deletedItem = jsondata.splice(index, 1);
    res.json(deletedItem[0]);
  }
});


module.exports = app;

