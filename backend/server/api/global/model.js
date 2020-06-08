import mongoose from 'mongoose';

var GlobalSchema = new mongoose.Schema({
    'order_no': {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    }
});

export default mongoose.model('Global', GlobalSchema);