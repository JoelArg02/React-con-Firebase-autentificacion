const express = require('express');
const app = express();
const cors = require('cors');

var admin = require("firebase-admin");
const serviceAccount = require('./keys/prueba-parcial-1262d-firebase-adminsdk-ig38q-826d50990e.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}); 

app.use(cors());
app.use(express.json());

const itemsRouter = require('./routes/itemsRouter');


app.use('/api/', itemsRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
