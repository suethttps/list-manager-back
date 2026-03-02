import { Router } from "express"
import { AuthController } from "../../modules/auth/infrastructure/AuthController"
import { ListController } from "../../modules/list/infrastructure/ListController"

const router = Router();
const authController = new AuthController();
const listController = new ListController();

router.get('/life-check', (req, res) => {
    res.status(200).send('On, API 💎')
});
// Auth routes
router.post('/login', (req, res) => authController.login(req, res));

// List routes
router.get('/lists/:id', (req, res) => listController.findById(req, res));
router.post('/lists', (req, res) => listController.create(req, res));
router.put('/lists/:id', (req, res) => listController.update(req, res));
router.delete('/lists/:id', (req, res) => listController.delete(req, res));
router.get('/lists', (req, res) => listController.findAll(req, res));
export default router