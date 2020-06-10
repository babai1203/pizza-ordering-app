import mongoose, { Schema } from 'mongoose';

var OrderSchema = new mongoose.Schema({
    'order_no': {
        type: String,
        required: true
    },
    'user': {
        type: String,
        required: true
    },
    'date': {
        type: Date,
        required: true
    },
    'items': [{
        'item': {
            type: Schema.ObjectId,
            ref: 'Menu'
        },
        'quantity': {
            type: Number
        },
        'price': {
            'currency': {
                type: String
            },
            'value': {
                type: Number
            }
        }
    }],
    'sub_total': {
        type: Number,
        required: true
    },
    'discount': {
        type: Number,
        required: true
    },
    'delivery_charge': {
        type: Number,
        required: true
    },
    'total_amount': {
        type: Number,
        required: true
    },
    'address': {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    }
});

export default mongoose.model('Order', OrderSchema);