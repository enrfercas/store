import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/companydb", {
    family: 4
})
    .then(db => console.log("DB is connected"))
    .catch(err => console.log('ESte es el error de conexión: ', err));

