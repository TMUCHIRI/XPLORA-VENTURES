import express from 'express';
import { UserController } from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';

const user_router = express.Router();
let controller = new UserController()

user_router.post('/register', controller.registerUser);
user_router.get('/fetch-all', controller.fetchAllUsers);
user_router.get('/:user_id', controller.fetchSingleUser);
user_router.put('/switch-role', controller.switchRoles);
user_router.put('/:user_id', controller.updateUser);
user_router.post('/login', loginUser);

export default user_router;
