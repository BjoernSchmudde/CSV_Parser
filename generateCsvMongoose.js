require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const Aqmpoint = require('./Aqmpoint');
(async () => {
    const allPoints = await Aqmpoint.find({
        'aqm.noxevent': { $gte: 50 }
    });
    let CsvText = `System Time, Nox\n`;
    allPoints.map(point => {
        CsvText += `${point.gps.system_time},${point.aqm.noxevent}\n`
    })
    await false.writeFileSync(process.env.DATALINK, CsvText);
})()