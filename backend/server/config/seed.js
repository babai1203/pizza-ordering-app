import config from './environment';
import Menu from '../api/menu/model';
import Global from '../api/global/model';

export default async function initializeDB() {
    if(config.getConstants().seedDB) {
        try {
            //Pre-populate Menu
            let count = await Menu.find().countDocuments();
            if(count == 0) {
                await Menu.create();
                console.log('Menu populated in the database.');
            }
            //Pre-populate Global
            count = await Global.find().countDocuments();
            if(count == 0) {
                await Global.create({ order_no: 'ORD1000' });
                console.log('Global populated in the database.');
            }
        } catch(e) {
            console.log(e);
        }
    }
}