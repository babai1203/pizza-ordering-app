import { Router } from 'express';
var router = Router();
import * as controller from './controller';
import * as auth from '../../auth/auth.service';

router.get('/', controller.get_menu);

module.exports = router;