import express from 'express';
import { checkDBHealth, healthCheck } from '../handlers/checkHealth';
import { handler } from '../utils/handler';
import { addUser } from "../handlers/user";

const router = express.Router();


// Test APIs
router.get('/', handler(healthCheck));
router.get("/test-db",handler(checkDBHealth))

// User APIs
router.post("/user",handler(addUser))

export default router;
