import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    role: {
        type: String,
        enum: ['user', 'model'],
        required: true,
    },
    parts: [{
        text: { type: String, required: true }
    }]
});

const chatSchema = new Schema({
    messages: [messageSchema],
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat;