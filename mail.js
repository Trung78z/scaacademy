const nodemailer = require("nodemailer");
const { configDotenv } = require("dotenv");
configDotenv();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async (fullName, email, phone, service, specificRequest) => {
  try {
    const info = await transporter.sendMail({
      from: "Web development",
      to: `trungpspy@gmail.com, Hvsca.academy@gmail.com`,
      subject: "Thông tin yêu cầu",
      text: `Họ và tên: ${fullName}\nEmail: ${email}\nSố điện thoại: ${phone}\nDịch vụ: ${service}\nYêu cầu cụ thể: ${specificRequest}`, // Nội dung văn bản email
      html: `<b>Họ và tên:</b> ${fullName}<br/><b>Email:</b> ${email}<br/><b>Số điện thoại:</b> ${phone}<br/><b>Dịch vụ:</b> ${service}<br/><b>Yêu cầu cụ thể:</b> ${specificRequest}`, // Nội dung HTML email
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
module.exports = sendMail;
