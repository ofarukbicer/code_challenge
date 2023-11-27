const ScrapeApkMirror = require("../services/ScrapeApkMirror");
const VersionsModel = require("../models/Versions");
const VariantsModel = require("../models/Variants");
const clc = require("cli-color");

class Scraper {
    static async ClearDatabase() {
        console.log();
        console.log(clc.bold(clc.red("- Started Clear Database")));
        await VersionsModel.deleteMany({});
        await VariantsModel.deleteMany({});
        console.log(clc.bold(clc.red("- Completed")));
    }

    static async RunVersions() {
        try {
            console.log();
            console.log(clc.bold(clc.cyan("- Scraper Started")));
            const apkmirror = new ScrapeApkMirror();
            console.log(clc.bold(clc.cyan("- Scrape Instragram Versions")));
            const versions = await apkmirror.Get10ReleaseVersions();

            console.log(clc.bold(clc.cyan("- Saving Database")));

            let i = 0;
            for (const version of versions) {
                const control_version = await VersionsModel.findOne({
                    version: version.version,
                });

                if (!control_version?._id) {
                    await VersionsModel.create(version);
                }

                i += 1;
                console.log(
                    clc.bold(
                        clc.cyan(`- Saving Database (${i}/${versions.length})`)
                    )
                );
            }

            console.log(clc.bold(clc.cyan("- Versions Process Completed")));
        } catch (error) {
            console.error(error);
        }
    }

    static async RunVariants() {
        try {
            console.log();
            console.log(clc.bold(clc.magenta("- Scraper Started")));
            const apkmirror = new ScrapeApkMirror();

            console.log(clc.bold(clc.magenta("- Find Versions")));
            const versions = await VersionsModel.find();

            let index = 0;
            let interval = setInterval(async () => {
                try {
                    const version = versions[index];
                    const variants = await apkmirror.GetVersionVariants(
                        version.detail_url
                    );

                    if (variants.length > 0) {
                        console.log(
                            clc.bold(
                                clc.magenta(
                                    `- Saving Variants (${variants.length})`
                                )
                            )
                        );
                        const save_variants = await VariantsModel.create(
                            variants
                        );
                        console.log(
                            clc.bold(
                                clc.magenta(`- Match Variants (${version._id})`)
                            )
                        );
                        await VersionsModel.updateOne(
                            { _id: version._id },
                            {
                                $set: {
                                    variants: save_variants.map((v) => v._id),
                                },
                            }
                        );
                    }
                } catch (error) {
                    console.log(clc.bold(clc.red(`- ${error}`)));
                } finally {
                    index += 1;
                    if (index >= versions.length) clearInterval(interval);
                }
            }, 5000);

            console.log(clc.bold(clc.magenta("- Versions Process Completed")));
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Scraper;
