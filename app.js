let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let helmet = require('helmet')
let stockRouter = require("./routes/stock");
let createError = require("http-errors")
let PORT = process.env.PORT || 5000;
let app = express();
require("dotenv").config();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static("client/build"));
// app.use(express.static(__dirname + "/public"));
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGO_URI, (err) => {
  console.log("mongodb connected ?", err ? false : true);
});

app.use("/api/stocks", stockRouter);

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {
//   app.get("*", (_req, res) => {
//     res.sendFile(path.join(__dirname + "/client/build/index.html"));
//   });
// }

//error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(function (err, _req, res, _next) {
  console.log("in error handler");
  // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    error: err,
  });
  //   if (process.env.NODE_ENV === "developemnt") {
  //     res.json({
  //       error: err,
  //     });
  //   }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
