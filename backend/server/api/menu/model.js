import mongoose from 'mongoose';

var MenuSchema = new mongoose.Schema({
    'title': {
        type: String,
        required: true
    },
    'category': {
        type: String,
        required: true
    },
    'description': {
        type: String
    },
    'price': {
        type: Number,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    }
});

export default mongoose.model('Menu', MenuSchema);