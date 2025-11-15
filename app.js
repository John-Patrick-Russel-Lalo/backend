import express from "express"
import 'dotenv/config.js'
import bookRoutes from "./routers/bookRoutes.js"
import studentRoutes from "./routers/studentRoutes.js"
import cors from 'cors';

const app = express()



app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}));


try {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`listening to ${process.env.PORT || 3000}`)
    })
} catch (e) {
    console.log(e)
}

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});





app.use('/book', bookRoutes);
app.use('/student', studentRoutes);