import express from "express"
import 'dotenv/config.js'
import bookRoutes from "./routers/bookRoutes.js"
import studentRoutes from "./routers/studentRoutes.js"

const app = express()

app.use(express.json());

const port = 3000

try {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`listening to ${process.env.PORT || 3000}`)
    })
} catch (e) {
    console.log(e)
}





app.use('/book', bookRoutes);
app.use('/student', studentRoutes);