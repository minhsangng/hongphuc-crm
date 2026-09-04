const { CronJob } = require("cron");
const https = require("https");

const job = new CronJob(
  "*/14 * * * *",
  () => {
    https
      .get("https://mamnonhongphuc.onrender.com", (res) => {
        if (res.statusCode === 200)
          console.log("GET request sent successfully");
        else
          console.log("GET request failed", res.statusCode);
      })
      .on("error", (e) =>
        console.error("Error while sending request", e)
      );
  },
  null,
  false,
  "Asia/Ho_Chi_Minh"
);

module.exports = job;