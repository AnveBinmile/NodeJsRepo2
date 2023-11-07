const express = require("express");
const fs = require("fs");
const { connected } = require("process");
const https = require("https");
const Port = 5000;
const path = require("path");
var bodyParser = require("body-parser");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json({ type: "application/*+json" }));
// app.get("/savevideo", (req, res) => {
//   const localPathToVideo1 =
//     "/home/anvesha/Documents/Anvesha/VscODE/NodePractise/NodeJs/Day9_downloadVideo/source/planet.mp4";

//   const videoStream1 = fs.createReadStream(localPathToVideo1);
//   const writeStream = fs.createWriteStream("./dest/result.mp4");
//   res.setHeader("Content-Type", "video/mp4");
//   videoStream1.pipe(res);
//   videoStream1.pipe(writeStream);
// });

app.get("/video", (req, response) => {
  const videourl =
    "https://media.istockphoto.com/id/1407324483/video/abstract-digital-grids-wire-frame-dots-blue-loop-background.mp4?s=mp4-640x640-is&k=20&c=26GOwfuXX9wUccr0Rm1QqDLA08RiDYF-fyVA2_U1m28=";
  const filePath = "video5.mp4";
  const fileStream = fs.createWriteStream(filePath);
  console.log(fileStream);
  https
    .get(videourl, (videoResponse) => {
      if (videoResponse.statusCode === 200) {
        videoResponse.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close(() => {
            response.send("Video download complete.");
          });
        });
      } else {
        console.error(
          `Failed to download the video. Status code: ${videoResponse.statusCode}`
        );
        response.status(videoResponse.statusCode).end();
      }
    })
    .on("error", (err) => {
      console.error("Error downloading the video:", err);
      response.status(500).end();
    });
});

app.post("/merge", (req, res) => {
  console.log(req.body);
  try {
    let buf1 = fs.readFileSync(
      path.resolve(__dirname + "/dest/", req.body.file1)
    );

    let buf2 = fs.readFileSync(
      path.resolve(__dirname + "/dest/", req.body.file2)
    );

    var arr = [buf2, buf1];

    var buf = Buffer.concat(arr);

    let arr1 = [];

    fs.writeFileSync(new Date().getTime() + ".webm", buf);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something bad happened");
  }
});

app.post("/mergeaudio", (req, res) => {
  console.log(req.body);
  try {
    let buf1 = fs.readFileSync(
      path.resolve(__dirname + "/dest/audios/", req.body.file1)
    );

    let buf2 = fs.readFileSync(
      path.resolve(__dirname + "/dest/audios/", req.body.file2)
    );

    var arr = [buf2, buf1];

    var buf = Buffer.concat(arr);

    // let arr1 = []

    fs.writeFileSync(new Date().getTime() + ".mp3", buf);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something bad happened");
  }
});

app.listen(Port, () => {
  console.log("listening on port ", Port);
});
