const express = require('express')
const upload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

const app = express()
app.use(upload({
    useTempFiles: true
}))
cloudinary.config({
    cloud_name: 'drvyjngdh',
    api_key: '445113726277837',
    api_secret: '9KNgMZlva35uVycz_0EgztEeExg'
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    if(req.files) {
        console.log(req.files)

        // .file isliye kyunki form mein name file hai
        const file = req.files.file
        const filename = file.name
        console.log(filename)

        // locally store krne ke liye
        // file.mv('./uploads/' + filename, (err) => {
        //     if(err) {
        //         res.send(err)
        //     } else {
        //         res.send("File uploaded!")
        //     }
        // })

        // to upload on cloudinary
        cloudinary.uploader.upload(file.tempFilePath, function(err, result) {
            res.send({
                url: result.url
            })
        })
    }

})



app.listen(3000, () => {
    console.log('Server started')
})