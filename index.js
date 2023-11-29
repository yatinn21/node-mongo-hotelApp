const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sample', {})
    .then(() => {
        console.log('Connected to mongoDB successfully.')
    })
    .catch((err) => {
        console.log('Connection unsuccessful', err);
    });

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    work: Boolean
});

const Student = new mongoose.model('Student', studentSchema);

(async () => {
    // const ss = new Student({
    //     name: 'Yatin',
    //     age: 23,
    //     work: true
    // });
    // await ss.save();

    await Student.create({
        name: 'Mukul',
        age: 18,
        work: false
    })

})();
