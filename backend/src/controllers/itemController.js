const admin = require('firebase-admin');
const db = admin.firestore();

exports.getItems = async (req, res) => {
    console.log('getItems');
    try {
        const querySnapshot = await db.collection('items').get();
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.addItem = async (req, res) => {
    try {
        const docRef = await db.collection('items').add(req.body);
        res.status(201).send(`Item created with ID: ${docRef.id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const doc = await db.collection('items').doc(req.params.id).get();
        if (!doc.exists) {
            res.status(404).send('No item found with that ID.');
        } else {
            res.json(doc.data());
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const docRef = db.collection('items').doc(id);
        await docRef.update(data);
        res.json({ id, ...data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params; 

    try {
        await db.collection('items').doc(id).delete(); 
        res.json({ message: 'Item deleted successfully' }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


