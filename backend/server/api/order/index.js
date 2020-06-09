import { Router } from 'express';
var router = Router();
import * as controller from './controller';
import * as auth from '../../auth/auth.service';

router.post('/', controller.place_order);

router.get('/history', auth.isLoggedin(), controller.get_order_history);

router.get('/:order_no', controller.get_order_details);

module.exports = router;