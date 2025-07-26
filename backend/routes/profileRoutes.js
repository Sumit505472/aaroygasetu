import express from 'express';

import { getProfile, updateProfile } from '../controllers/profileControllers.js';
import { verifyToken } from '../middlewares/verifytokens.js';


const router=express.Router();

router.get("/",verifyToken,getProfile);
router.put("/",verifyToken,updateProfile);

export default router;
