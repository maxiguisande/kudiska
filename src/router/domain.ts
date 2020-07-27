import { Router } from 'express';
import { getDomains } from '../controller/domain.controller';

const router = Router();

router.get('/dominios/:dominio', getDomains);

export default router;