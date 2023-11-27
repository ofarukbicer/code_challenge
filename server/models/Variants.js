const mongoose = require("mongoose");

const VariantsSchema = new mongoose.Schema(
    {
        variant_id: {
            type: Number,
            required: true,
        },
        architecture: {
            type: String,
            required: true,
        },
        min_android_version: {
            type: String,
            required: true,
        },
        dpi: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Variants", VariantsSchema);
