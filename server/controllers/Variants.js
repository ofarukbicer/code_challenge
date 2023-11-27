const VariantsService = require("../services/Variants");

class Variants {
    static async GetFind(req, res) {
        try {
            const getVariant = await VariantsService.FindVariant(
                req.query.id ?? ""
            );

            if (getVariant.code != 0)
                return res.status(500).json({
                    message: getVariant.message,
                    code: getVariant.code,
                });

            res.status(200).json({
                message: getVariant.message,
                variant: getVariant.variant,
                code: 0,
            });
        } catch (error) {
            res.status(500).json({
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz.",
                code: 999,
            });
        }
    }

    static async Delete(req, res) {
        try {
            const deleteVariant = await VariantsService.DeleteVariant(
                req.query.id ?? ""
            );

            res.status(deleteVariant.code != 0 ? 500 : 200).json({
                message: deleteVariant.message,
                code: deleteVariant.code,
            });
        } catch (error) {
            res.status(500).json({
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz.",
                code: 999,
            });
        }
    }

    static async Update(req, res) {
        try {
            const updateVariant = await VariantsService.UpdateVariant(
                req.query.id ?? "",
                req.body
            );

            res.status(updateVariant.code != 0 ? 500 : 200).json({
                message: updateVariant.message,
                code: updateVariant.code,
            });
        } catch (error) {
            res.status(500).json({
                message:
                    "İşlemlerimde bir sıkıntı yaşıyorum lütfen yetkili ile iletişime geçiniz.",
                code: 999,
            });
        }
    }
}

module.exports = Variants;
