const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore();
const PORT = 3001;

app.use(session({
  secret:"some secret",
  cookie: {maxAge: 60000},
  saveUninitialized: false,
  store
}))

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    return callback(null, true);
  }
}));

const db = require("./models");

// Routers
const Contact = require("./routes/contact");
app.use("/contact", Contact);


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});

// Run All Crons
const runCrons = require("./crons");
runCrons();
