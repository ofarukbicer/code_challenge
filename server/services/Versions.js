const Variants = require("../models/Variants");
const Versions = require("../models/Versions");

class VersionsService {
    static AllVersions = async () => {
        try {
            const versions = await Versions.aggregate([
                {
                    $project: {
                        name: 1,
                        version: 1,
                        detail_url: 1,
                        published_date: 1,
                        variants: {
                            $size: "$variants",
                        },
                    },
                },
            ]);

            if (versions.length > 0) {
                return {
                    message: `${versions.length} adet versiyon başarıyla getirildi.`,
                    versions,
                    code: 0,
                };
            } else {
                return {
                    message: "Henüz versiyon bulunamadı.",
                    versions: [],
                    code: 997,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz. AllVersions",
                code: 999,
            };
        }
    };

    static FindVersion = async (version_id) => {
        try {
            const version = await Versions.aggregate([
                {
                    $match: {
                        version: version_id,
                    },
                },
                {
                    $lookup: {
                        from: "variants",
                        localField: "variants",
                        foreignField: "_id",
                        as: "variants",
                    },
                },
            ]);

            if (version.length > 0) {
                return {
                    message: `Versiyon detayları başarılı şekilde getirildi`,
                    version: version[0],
                    code: 0,
                };
            } else {
                return {
                    message: "İstediğiniz versiyonu bulamadım",
                    code: 997,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz. FindVersion",
                code: 999,
            };
        }
    };

    static DeleteVersion = async (version_id) => {
        try {
            const version = await Versions.findOneAndDelete({
                version: version_id,
            });

            if (version?._id) {
                for (const variant of version.variants) {
                    await Variants.deleteOne({ _id: variant });
                }
                return {
                    message: `Versiyon başarılı şekilde silindi`,
                    code: 0,
                };
            } else {
                return {
                    message: "İstediğiniz versiyonu bulamadım",
                    code: 997,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz. DeleteVersion",
                code: 999,
            };
        }
    };

    static UpdateVersion = async (version_id, data) => {
        try {
            const version = await Versions.updateOne(
                { version: version_id },
                {
                    $set: data,
                }
            );

            if (version.modifiedCount > 0) {
                return {
                    message: `Versiyon başarılı şekilde güncellendi`,
                    code: 0,
                };
            } else if (version.matchedCount > 0) {
                return {
                    message:
                        "Düzenleme yaparken bir hata aldım lütfen tekrar deneyiniz",
                    code: 996,
                };
            } else {
                return {
                    message: "İstediğiniz versiyonu bulamadım",
                    code: 997,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz. UpdateVersion",
                code: 999,
            };
        }
    };
}

module.exports = VersionsService;
