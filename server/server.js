require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/index");

const clc = require("cli-color");

const app = express();

/* MongoDB */
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
mongoose.connection.on("open", async () => {
    console.log(clc.bold(clc.green("- MongoDB succefuly connected!")));

    // Uc fonksiyonu aktif edince Instagram versiyonlarini toplamaya baslar.
    // ClearDatabase veritabaninda bulunan eski versiyonlari temizlemek adina olusturuldu.
    // const Scraper = require("./utils/Scraper");
    // await Scraper.ClearDatabase();
    // await Scraper.RunVersions();
    // await Scraper.RunVariants();
});

mongoose.connection.on("error", (err) => {
    console.log(clc.bold(clc.red(`- MongoDB connection error: ${err}`)));
    process.exit(1);
});

(async () =>
    await mongoose.connect(
        process.env.MONGO_URI || "mongodb://127.0.0.1:27017",
        {
            dbName: "code_challenge",
        }
    ))();

console.log(clc.reset + clc.green.bold("Server is starting...\r\x1b[K"));

/* Application */
app.set("x-powered-by", false);
app.set("view cache", false);
app.set("etag", "strong");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    express.static("public", {
        etag: false,
        maxAge: "5000",
    })
);
app.use(cors());
app.use("/", router);

app.listen(
    process.env.APP_PORT || 8080,
    process.env.APP_HOST || "localhost",
    () => {
        console.log(
            clc.bold(
                clc.green(`App running at:
  - Local:   http://${process.env.APP_HOST || "localhost"}:${
                    process.env.APP_PORT || 8080
                }
        `)
            )
        );
    }
);
