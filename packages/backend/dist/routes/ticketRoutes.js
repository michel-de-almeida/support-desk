"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("../controllers/ticketController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, ticketController_1.TicketController.getTickets);
router.get('/user', authMiddleware_1.protect, ticketController_1.TicketController.getUserTickets);
router.get('/:id', authMiddleware_1.protect, ticketController_1.TicketController.getTicket);
router.post('/', authMiddleware_1.protect, ticketController_1.TicketController.setTicket);
router.put('/', authMiddleware_1.protect, ticketController_1.TicketController.updateTicket);
router.delete('/:id', authMiddleware_1.protect, ticketController_1.TicketController.deleteTicket);
exports.default = router;
//# sourceMappingURL=ticketRoutes.js.map