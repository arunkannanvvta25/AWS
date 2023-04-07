import express from 'express'
import { generateUploadURL } from './s3Upload.js'
import cors from 'cors'
const app = express()

//app.use(express.static('front'))
app.use(express.json());

app.use(cors())

app.post('/s3Url', async (req, res) => {
  const url = await generateUploadURL(req.body.fileName)
  res.send({url})
})


app.listen(8080, () => console.log("listening on port 8080"))