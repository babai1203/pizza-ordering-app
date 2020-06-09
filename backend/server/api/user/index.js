import { Router } from 'express';
var router = Router();
import * as controller from './controller';
import * as auth from '../../auth/auth.service';

router.post('/signup', controller.create_new_user);

module.exports = router;