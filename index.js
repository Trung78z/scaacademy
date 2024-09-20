(async () => {
  const fetch = (await import("node-fetch")).default;
  const cheerio = require("cheerio");
  const fs = require("fs");
  const path = require("path");
  const url = require("url");

  // Hàm để tạo thư mục nếu chưa tồn tại
  function ensureDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  // Hàm để tải một trang và các tài nguyên liên quan với user-agent tùy chọn
  async function downloadPage(urlString, userAgent, folderName) {
    try {
      const response = await fetch(urlString, {
        headers: {
          "User-Agent": userAgent, // Thêm User-Agent tùy chọn
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${urlString}: ${response.statusText}`);
      }

      const body = await response.text();
      const $ = cheerio.load(body);

      const baseDir = path.join(__dirname, folderName);
      ensureDirExists(baseDir);

      // Lưu trang HTML chính
      fs.writeFileSync(path.join(baseDir, "index.html"), body);
      console.log(`Tải trang chính về ${path.join(baseDir, "index.html")}`);

      // Tải các tài nguyên (link, script, img)
      $("link[href], script[src], img[src]").each(async (i, element) => {
        const src = $(element).attr("href") || $(element).attr("src");
        if (src) {
          try {
            const srcUrl = url.resolve(urlString, src);

            // Loại bỏ chuỗi truy vấn nếu có
            const cleanSrcUrl = srcUrl.split("?")[0];

            // Tính đường dẫn đầy đủ theo cấu trúc URL tài nguyên
            const relativePath = url.parse(src).pathname; // Lấy đường dẫn tương đối từ URL
            const fullResourceDir = path.join(
              baseDir,
              path.dirname(relativePath)
            );

            // Đảm bảo thư mục đầy đủ tồn tại (tạo nếu chưa có)
            ensureDirExists(fullResourceDir);

            // Tải tài nguyên
            const resourceResponse = await fetch(cleanSrcUrl);
            if (!resourceResponse.ok) {
              throw new Error(
                `Failed to fetch resource ${cleanSrcUrl}: ${resourceResponse.statusText}`
              );
            }

            const resourceBuffer = await resourceResponse.buffer();
            const resourcePath = path.join(
              fullResourceDir,
              path.basename(cleanSrcUrl)
            );

            // Lưu tài nguyên vào đúng đường dẫn
            fs.writeFileSync(resourcePath, resourceBuffer);
            console.log(`Tải ${cleanSrcUrl} về ${resourcePath}`);
          } catch (error) {
            console.error(`Lỗi khi tải tài nguyên ${src}: ${error.message}`);
          }
        }
      });
    } catch (error) {
      console.error(`Lỗi khi tải trang ${urlString}: ${error.message}`);
    }
  }

  // Gọi hàm để tải trang web phiên bản desktop
  const desktopUserAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
  downloadPage("https://jbmedia.vn", desktopUserAgent, "jbmedia-desktop");

  // Gọi hàm để tải trang web phiên bản mobile
  const mobileUserAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1";
  downloadPage("https://jbmedia.vn", mobileUserAgent, "jbmedia-mobile");
})();
