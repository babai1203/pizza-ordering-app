import Menu from './model';

export async function get_menu (req, res) {
    try {
        let menus = await Menu.find({},{price:1,title:1,category:1,description:1});
        let obj = {};
        menus.forEach((a)=>{
            if(obj[a.category]) {
                obj[a.category].push(a);
            } else {
                obj[a.category] = [a];
            }
        });
        return res.status(200).json(obj);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ message: 'Menu fetching failed.' });
    }
}