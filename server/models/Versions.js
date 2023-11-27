const mongoose = require("mongoose");

const VersionsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        version: {
            type: String,
            required: true,
        },
        detail_url: {
            type: String,
            required: true,
        },
        published_date: {
            type: Date,
            required: true,
        },
        variants: {
            type: [mongoose.Types.ObjectId],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Versions", VersionsSchema);
