// need express to interact with the front end
const express = require("express");
// need path for filename paths
const path = require("path");
// need fs to read and write to files
const fs = require("fs");

// creating an "express" server
const app = express();
// Sets an Initial port for listeners
const PORT = process.env.PORT || 6900;

//  Initialize notes

let notes = [];

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));

// routes

// api call response for all the notes, and sends the results to the browser as an array of object

app.get("/api/notes", (err, res) => {
  try {
    // reads the notes from json file
    notes = fs.readFileSync("Develop/db/db.json", "utf8");
    console.log("hello!");
    // parse it so notes is an array of objects
    notes = JSON.parse(notes);

    // error handling
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  //   send objects to the browser
  res.json(notes);
});

// writes the new note to the json file
app.post("/api/notes", (req, res) => {
  try {
    // reads the json file
    notes = fs.readFileSync("./Develop/db/db.json", "utf8");
    console.log(notes);

    // parse the data to get an array of objects
    notes = JSON.parse(notes);
    // Set new notes id
    req.body.id = notes.length;
    // add the new note to the array of note objects
    notes.push(req.body); // req.body - user input
    // make it string(stringify)so you can write it to the file
    notes = JSON.stringify(notes);
    // writes the new note to file
    fs.writeFile("./Develop/db/db.json", notes, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });
    // changeit back to an array of objects & send it back to the browser(client)
    res.json(JSON.parse(notes));

    // error Handling
  } catch (err) {
    throw err;
    console.error(err);
  }
});

// Delete a note

app.delete("/api/notes/:id", (req, res) => {
  try {
    //  reads the json file
    notes = fs.readFileSync("./Develop/db/db.json", "utf8");
    // parse the data to get an array of the objects
    notes = JSON.parse(notes);
    // delete the old note from the array on note objects
    notes = notes.filter(function(note) {
      return note.id != req.params.id;
    });
    // make it string(stringify)so you can write it to the file
    notes = JSON.stringify(notes);
    // write the new notes to the file
    fs.writeFile("./Develop/db/db.json", notes, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });

    // change it back to an array of objects & send it back to the browser (client)
    res.send(JSON.parse(notes));

    // error handling
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// HTML GET Requests

app.use(express.static((__dirname, "Develop/public")))

// Start the server on the port
app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
});

