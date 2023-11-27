require("dotenv").config();
const mongoose = require("mongoose");

const clc = require("cli-color");
const Scraper = require("./utils/Scraper");

/* MongoDB */
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
mongoose.connection.on("open", async () => {
    console.log(clc.bold(clc.green("- MongoDB succefuly connected!")));

    // Uc fonksiyonu aktif edince Instagram versiyonlarini toplamaya baslar.
    // ClearDatabase veritabaninda bulunan eski versiyonlari temizlemek adina olusturuldu.
    await Scraper.ClearDatabase();
    await Scraper.RunVersions();
    await Scraper.RunVariants();

    // Programi sonlandir
    process.exit(1);
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
