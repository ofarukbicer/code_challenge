const VersionsService = require("../services/Versions");

class Versions {
    static async GetAll(req, res) {
        try {
            const getVersions = await VersionsService.AllVersions();

            if (getVersions.code != 0)
                return res.status(500).json({
                    message: getVersions.message,
                    code: getVersions.code,
                });

            res.status(200).json({
                message: getVersions.message,
                versions: getVersions.versions,
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

    static async GetFind(req, res) {
        try {
            const getVersion = await VersionsService.FindVersion(
                req.query.id ?? ""
            );

            if (getVersion.code != 0)
                return res.status(500).json({
                    message: getVersion.message,
                    code: getVersion.code,
                });

            res.status(200).json({
                message: getVersion.message,
                version: getVersion.version,
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
            const deleteVersion = await VersionsService.DeleteVersion(
                req.query.id ?? ""
            );

            res.status(deleteVersion.code != 0 ? 500 : 200).json({
                message: deleteVersion.message,
                code: deleteVersion.code,
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
            const updateVersion = await VersionsService.UpdateVersion(
                req.query.id ?? "",
                req.body
            );

            res.status(updateVersion.code != 0 ? 500 : 200).json({
                message: updateVersion.message,
                code: updateVersion.code,
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

module.exports = Versions;
