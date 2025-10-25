import express from "express"

const app = express()

app.use(express.json());

const port = 3000

try {
    app.listen(port, () => {
        console.log("listening to " + port)
    })
} catch (e) {
    console.log(e)
}






app.get('/patrick', async (req, res) => {
    res.status(200).send({message: "Lalo, John Patrick Russel"})
})