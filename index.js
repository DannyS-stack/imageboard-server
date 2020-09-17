const express = require("express");
const app = express();
const PORT = 4000;
const jsonParser = express.json();

const userRouter = require("./Router/user");
const imageRouter = require("./Router/image");

app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.get("/", (request, response) => {
  response.send("got something");
});

app.listen(PORT, () => {
  console.log("I'm listening");
});
