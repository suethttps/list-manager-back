import { Router } from "express"
import { AuthController } from "../../modules/auth/infrastructure/AuthController"

const router = Router();
const authController = new AuthController();

router.get('/life-check', (req, res) => {
    res.status(200).send('On, API 💎')
});

router.post('/login', (req, res) => authController.login(req, res));

export default router