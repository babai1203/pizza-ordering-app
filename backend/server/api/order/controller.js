import Order from './model';
import Global from '../global/model';

export async function place_order (req, res) {
    try {
        if(!req.body.user) return res.status(400).json({ message: 'User details is required.' });
        if(req.body.items.length == 0) return res.status(400).json({ message: 'Items is required.' });
        if(!req.body.address) return res.status(400).json({ message: 'Address details is required.' });
        let global = await Global.findOne({});
        req.body['order_no'] = global.order_no;
        req.body['date'] = new Date();
        let order = await Order.create(req.body);
        let order_no = order.order_no.split('ORD')[1];
        order_no = 'ORD' + ++order_no;
        await Global.findOneAndUpdate({}, { $set: { order_no:order_no }});
        return res.status(200).json({ order_no: order.order_no });
    } catch(e) {
        console.log(e);
        return res.status(400).json({ message: 'Order placement failed.' });
    }
}

export async function get_order_details (req, res) {
    try {
        let order = await Order.findOne({ order_no: req.params.order_no }).populate('items.item','title');
        return res.status(200).json(order);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ message: 'Order details fetching failed.' });
    }
}

export async function get_order_history (req, res) {
    try {
        let orders = await Order.find({ user: req.user._id }).populate('items.item','title');
        orders.forEach((a)=>{
            a.user = req.user.name;
        });
        return res.status(200).json(orders);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ message: 'Order details fetching failed.' });
    }
}