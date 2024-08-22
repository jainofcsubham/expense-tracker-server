import express from 'express';
import { checkDBHealth, healthCheck } from '../handlers/checkHealth';
import { handler } from '../utils/handler';
import { addUser } from "../handlers/user";
import { getUser } from '../handlers/user';
import { addCategory } from '../handlers/category';
import { readCategory } from '../handlers/category';

const router = express.Router();


// Test APIs
router.get('/', handler(healthCheck));
router.get("/test-db",handler(checkDBHealth))

// User APIs
router.post("/user",handler(addUser))
router.get("/user",handler(getUser))

// Category APIs
router.post("/category",handler(addCategory))
router.get("/category",handler(readCategory))

export default router;
