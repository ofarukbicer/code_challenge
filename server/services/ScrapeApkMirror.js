const axios = require("axios");
const cheerio = require("cheerio");

class ScrapeApkMirror {
    Versions = [];

    async Request2Cheerio(url) {
        try {
            const request = await axios.get(url, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
                },
            });
            const cheerio_data = cheerio.load(request.data);

            return cheerio_data;
        } catch (error) {
            throw "Cloudflare does not allow data withdrawal";
        }
    }

    async GetVersionVariants(url) {
        const $ = await this.Request2Cheerio(url);
        let variants = [];
        $(".variants-table .headerFont").each((_idx, el) => {
            const variant_id = $(el)
                .find(".dowrap span.colorLightBlack")
                .text()
                .trim()
                .slice(0, 9);
            const architecture = $(el)
                .find(".dowrap:nth-child(2)")
                .text()
                .trim();
            const min_android_version = $(el)
                .find(".dowrap:nth-child(3)")
                .text()
                .trim();
            const dpi = $(el).find(".dowrap:nth-child(4)").text().trim();

            variants.push({
                variant_id,
                architecture,
                min_android_version,
                dpi,
            });
        });

        return variants.filter((v) => v.variant_id != "");
    }

    async GetVersions(page = 1) {
        const $ = await this.Request2Cheerio(
            `https://www.apkmirror.com/uploads/page/${page}/?appcategory=instagram-instagram`
        );

        $(".widget_appmanager_recentpostswidget .appRow .table-row").each(
            (_idx, el) => {
                if (this.Versions.length <= 10) {
                    const version = $(el)
                        .find(".table-cell h5 a")
                        .text()
                        .trim();
                    const detail_url =
                        "https://www.apkmirror.com/" +
                        $(el).find(".table-cell h5 a").attr("href");
                    const published_date = $(el)
                        .find(".table-cell span span")
                        .attr("data-utcdate");

                    if (
                        !version.endsWith("alpha") &&
                        !version.endsWith("beta")
                    ) {
                        this.Versions.push({
                            name: version.split(" ")[0],
                            version: version.split(" ")[1],
                            detail_url,
                            published_date,
                        });
                    }
                }
            }
        );
    }

    async Get10ReleaseVersions() {
        let page = 1;
        while (this.Versions.length <= 10) {
            await this.GetVersions(page);
            page += 1;
        }

        return this.Versions.slice(0, 10);
    }
}

module.exports = ScrapeApkMirror;
