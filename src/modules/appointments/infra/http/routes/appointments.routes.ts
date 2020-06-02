import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const controller = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find({
//     where: { provider_id: request.user.id },
//   });
//   return response.json(appointments);
// });

appointmentsRouter.post('/', controller.create);

export default appointmentsRouter;
