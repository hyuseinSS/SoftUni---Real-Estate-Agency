const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/RealEstate';


exports.initializeDatabase = (app) => mongoose.connect(url, {
    family: 4,
}).then(() => {
    console.log('Database connected')
}).then(() => {
    app.listen(3000, () => console.log('App is listening on port 3000'))
}).catch((err) => {
    console.log(`DB/Server Error: ${err}`)
})