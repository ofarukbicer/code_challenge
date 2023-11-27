const Variants = require("../models/Variants");
const Versions = require("../models/Versions");

class VariantsService {
    static FindVariant = async (variant_id) => {
        try {
            const variant = await Variants.aggregate([
                {
                    $match: {
                        variant_id: parseInt(variant_id),
                    },
                },
            ]);

            if (variant.length > 0) {
                return {
                    message: `Varyant detayları başarılı şekilde getirildi`,
                    variant: variant[0],
                    code: 0,
                };
            } else {
                return {
                    message: "İstediğiniz varyantı bulamadım",
                    code: 997,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz. FindVariant",
                code: 999,
            };
        }
    };

    static DeleteVariant = async (variant_id) => {
        try {
            const variant = await Variants.findOneAndDelete({ variant_id });

            if (variant?._id) {
                await Versions.updateOne(
                    { variants: variant?._id },
                    {
                        $pull: {
                            variants: variant?._id,
                        },
                    }
                );
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
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz. DeleteVariant",
                code: 999,
            };
        }
    };

    static UpdateVariant = async (variant_id, data) => {
        try {
            const variant = await Variants.updateOne(
                { variant_id },
                {
                    $set: data,
                }
            );

            if (variant.modifiedCount > 0) {
                return {
                    message: `Versiyon başarılı şekilde güncellendi`,
                    code: 0,
                };
            } else if (variant.matchedCount > 0) {
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
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz. UpdateVariant",
                code: 999,
            };
        }
    };
}

module.exports = VariantsService;
