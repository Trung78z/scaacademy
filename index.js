const express = require("express");
const userAgent = require("express-useragent");

const path = require("path");
const cors = require("cors");
const sendMail = require("./mail");
const app = express();
app.use(userAgent.express());
app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  const ua = req.useragent;

  if (ua.isMobile) {
    app.use(express.static(path.join(__dirname, "public/mobile")));
    res.sendFile(path.join(__dirname, "public/mobile/index.html"));
  } else {
    app.use(express.static(path.join(__dirname, "public/desktop")));
    app.use(express.static(path.join(__dirname, "public")));
    res.sendFile(path.join(__dirname, "public/desktop/index.html"));
  }
});
app.post("/sendMail", async (req, res) => {
  const { fullName, email, phone, service, specificRequest } = req.body;

  const result = await sendMail(
    fullName,
    email,
    phone,
    service,
    specificRequest
  );
  if (result.success) {
    res.json({
      success: true,
      message: "Dữ liệu đã được gửi thành công!",
      messageId: result.messageId,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Đã xảy ra lỗi khi gửi email",
      error: result.error,
    });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
