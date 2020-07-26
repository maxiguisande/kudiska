import { Router } from 'express';
import { putUser, postUser, loginUser } from '../controller/user.controller';
import { validateToken } from '../middlewares/authenticate';

const router = Router();

router.put('/usuario', [validateToken], putUser);
router.post('/usuario', postUser);
router.post('/login', loginUser);

export default router;