const express = require("express");

const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const formHandler = require("../application/form");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to FormNegar app");
});

app.get("/api/forms/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { form, error } = formHandler.fetch(id);
    if (error) {
      res.error(error);
    }
    res.send({ form });
  } catch (error) {
    console.log(error);
    res.status(500).send("Oops, something is going wrong, please try again");
  }
});

app.get("/api/forms", (req, res) => {
  try {
    const forms = formHandler.fetchAllForms();
    res.send({ forms });
  } catch (error) {
    console.log(error);
    res.status(500).send("Oops, something is going wrong, please try again");
  }
});
app.post("/api/forms", (req, res) => {
  try {
    const form = req.body;
    formHandler.insert(form);
    res.send("form inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Oops, something is going wrong, please try again");
  }
});

app.post("/api/forms/:id", (req, res) => {
  try {
    const form = req.body;
    formHandler.printForm(form);
    res.send({ form });
  } catch (error) {
    console.log(error);
    res.status(500).send("Oops, something is going wrong, please try again");
  }
});
app.delete("/api/reset/:id/:acc", (req, res) => {
  try {
    const { id, acc } = req.params;

    if (id == 1911 && acc == 1937) {
      //if string also is accepted so ==
      let resOp = formHandler.reset();
      res.send({ resOp });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Oops, something is going wrong, please try again");
  }
});

app.listen(PORT, () => console.log("FormNegar app listening on port " + PORT));

// http://localhost:5000/api/forms
// {
//   "title": "sample ",
//     "fields": [{
//       "name": "name",
//       "title": "title",
//       "type": "type",
//       "required": "required",
//       "hasOptions": "hasOptions",
//       "options": "options"
//     }]

// }
