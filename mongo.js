const mongoose = require("mongoose");

if (process.argv.length < 6) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.uke9y.mongodb.net/phoneBook?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Note = mongoose.model("Note", noteSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const note = new Note({
      name: "John",
      number: "12-14556-132",
    });

    return note.save();
  })
  .then(() => {
    console.log("note saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));

//   Note.find({}).then((result) => {
//     result.forEach((note) => {
//       console.log(note);
//     });
//     mongoose.connection.close();
//   });
// });
