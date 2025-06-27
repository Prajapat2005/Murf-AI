import mongoose from "mongoose"

const testVoiceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        default: ""
    }
})

const testVoice = mongoose.models.testVoice || mongoose.model("testVoice", testVoiceSchema);

export default testVoice;