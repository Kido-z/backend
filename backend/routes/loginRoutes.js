const { Signup } = require('./controllers/loginController');
const router = express.Router();

router.post("/signup", Signup);

module.exports = router;