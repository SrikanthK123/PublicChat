import express from 'express';
import { CreateUser,GetUser,CheckUser } from '../controller/UserController.js';
import { getMessages,sendMessage } from '../controller/MessageController.js';
import {getPublicMessages,sendPublicMessage} from '../controller/PublicMessageController.js'

const router = express.Router();

router.post('/createUser', CreateUser);
router.get('/getUser', GetUser);

router.get('/getMessages/:userId', getMessages); // Add endpoint for fetching messages
router.post('/sendMessage/:userId', sendMessage); // Add endpoint for sending messages
router.get('/getPublicMessages', getPublicMessages);
router.post('/sendPublicMessage', sendPublicMessage);
router.post('/checkUser', CheckUser);

export default router;
