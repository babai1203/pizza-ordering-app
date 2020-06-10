import config from './environment';
import Menu from '../api/menu/model';
import Global from '../api/global/model';

export default async function initializeDB() {
    if(config.getConstants().seedDB) {
        try {
            //Pre-populate Menu
            let count = await Menu.find().countDocuments();
            if(count == 0) {
                let menus = [{"title":"Margherita","category":"Pizza","description":"Tomato sauce, mozzarella, and oregano","price":{"dollar":62,"euro":55.18}},{"title":"Marinara","category":"Pizza","description":"Tomato sauce, garlic and basil","price":{"dollar":58,"euro":51.62}},{"title":"Quattro Stagioni","category":"Pizza","description":"Tomato sauce, mozzarella, mushrooms, ham, artichokes, olives, and oregano","price":{"dollar":82,"euro":72.98}},{"title":"Carbonara","category":"Pizza","description":"Tomato sauce, mozzarella, parmesan, eggs, and bacon","price":{"dollar":43,"euro":38.27}},{"title":"Frutti di Mare","category":"Pizza","description":"Tomato sauce and seafood","price":{"dollar":58,"euro":51.62}},{"title":"Quattro Formaggi","category":"Pizza","description":"Tomato sauce, mozzarella, parmesan, gorgonzola cheese, artichokes, and oregano","price":{"dollar":76,"euro":67.64}},{"title":"Crudo","category":"Pizza","description":"Tomato sauce, mozzarella and Parma ham","price":{"dollar":98,"euro":87.22}},{"title":"Napoletana","category":"Pizza","description":"Tomato sauce, mozzarella, oregano, anchovies","price":{"dollar":96,"euro":85.44}},{"title":"Pugliese","category":"Pizza","description":"Tomato sauce, mozzarella, oregano, and onions","price":{"dollar":81,"euro":72.09}},{"title":"Montanara","category":"Pizza","description":"Tomato sauce, mozzarella, mushrooms, pepperoni, and Stracchino (soft cheese)","price":{"dollar":74,"euro":65.86}},{"title":"Emiliana","category":"Pizza","description":"Tomato sauce, mozzarella, eggplant, boiled potatoes, and sausage","price":{"dollar":45,"euro":40.05}},{"title":"Prosciutto","category":"Pizza","description":"Tomato sauce, mozzarella, ham, and oregano","price":{"dollar":40,"euro":35.6}},{"title":"Tiramisu","category":"Dessert","description":"","price":{"dollar":33,"euro":29.37}},{"title":"Chocolate Moose","category":"Dessert","description":"","price":{"dollar":25,"euro":22.25}},{"title":"Angel Food Cake","category":"Dessert","description":"","price":{"dollar":32,"euro":28.48}},{"title":"Strawberry Crumble","category":"Dessert","description":"","price":{"dollar":32,"euro":28.48}},{"title":"Maltesers tiramisu","category":"Dessert","description":"","price":{"dollar":38,"euro":33.82}},{"title":"Apple Berry Crumble","category":"Dessert","description":"","price":{"dollar":26,"euro":23.14}}];
                for(let i=0;i<menus.length;i++) {
                    await Menu.create(menus[i]);
                }
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