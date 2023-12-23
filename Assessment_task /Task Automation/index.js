const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const async = require("async");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/saveFile', function (req, res) {
    if (req.body.length > 0) {
        const files = req.body;
        files.forEach(element => {
            console.log(element)
            fs.writeFile(__dirname + '/tmp/' + element.fileName, element.fileContent, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        });
    }
    res.send(JSON.stringify({ status: "success" }))
});

app.get('/combineFiles', async function (req, resp) {
    const directory = __dirname + '/tmp/';
    let filePaths;
    fs.readdir(directory, async (err, files) => {
        if (err)
            console.log(err)

        filePaths = files = files.map(file => path.join(directory, file));
        async.map(files, fs.readFile, (err, results) => {
            if (err)
                console.log(err)

            const concatenatedContent = results.join(" ");
            fs.writeFile(__dirname + '/tmp/concatenated.txt', concatenatedContent, (err) => {
                if (err)
                    console.log(err)
                else
                    console.log("File Write");

                async.map(filePaths, fs.unlink, (err, res) => {
                    if (err)
                        console.log(err)
                    else
                        console.log("File Removed");

                    resp.send(JSON.stringify({ status: "success", data: concatenatedContent }));
                });
            });
        });
    });
});

app.listen(3000);
