const { Parser } = require("html-to-react");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

// Khởi tạo Parser từ thư viện
const htmlToReactParser = new Parser();

// HTML cần chuyển đổi
const html = ``;
const fs = require("fs");
// Chuyển đổi HTML thành React Element
const reactElement = htmlToReactParser.parse(html);

// Chuyển đổi React Element thành JSX string
const jsxString = ReactDOMServer.renderToStaticMarkup(reactElement);
fs.writeFile("output.jsx", jsxString, (err) => {
  if (err) {
    console.error("Error writing file", err);
  } else {
    console.log("File written successfully");
  }
});
console.log(jsxString);
