import { Router } from 'express';
import { validateToken } from '../middlewares/authenticate';
import { getSelectorTypes, getApplicationTypes } from '../controller/selector.controller';

const router = Router();

router.get('/tipo_selectores', [validateToken], getSelectorTypes);
router.get('/tipo_aplicaciones', [validateToken], getApplicationTypes);

export default router;