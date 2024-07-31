import express from 'express';
import { checkDBHealth, healthCheck } from '../handlers/checkHealth';
import { handler } from '../utils/handler';

const router = express.Router();


// Test APIs
router.get('/', handler(healthCheck));
router.get("/test-db",handler(checkDBHealth))

export default router;
