import express from 'express'; 
import { applyForJob } from '../controllers/jobController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/apply', upload.single('resume'), applyForJob);

export default router;