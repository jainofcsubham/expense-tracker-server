import express from 'express';
import { healthCheck } from '../handlers/checkHealth';
import { handler } from '../utils/handler';

const router = express.Router();

/* GET home page. */
router.get('/', handler(healthCheck));

export default router;
