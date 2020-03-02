import { Router } from 'express';
import userRoute from '../../components/user/user.route';
import adminRoute from '../../components/admin/admin.route';


const router = new Router();

router.use('/users', userRoute);
router.use('/admin', adminRoute);

export default router;
