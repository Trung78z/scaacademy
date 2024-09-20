const express = require("express");
const userAgent = require("express-useragent");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(userAgent.express());
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  const ua = req.useragent;

  if (ua.isMobile) {
    app.use(express.static(path.join(__dirname, "public/mobile")));
    res.sendFile(path.join(__dirname, "public/mobile/index.html"));
  } else {
    app.use(express.static(path.join(__dirname, "public/desktop")));
    res.sendFile(path.join(__dirname, "public/desktop/index.html"));
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
