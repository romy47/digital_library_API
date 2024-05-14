import { Router } from 'express';

const authRrouter: Router = Router();
authRrouter.route('/signup').post((req, res, next) => {
    res.status(200).send({
        message: 'Signup Route Working!',
    });
});
export default authRrouter;
