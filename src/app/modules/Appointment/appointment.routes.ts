import express from 'express';
import { AppointmentController } from './appointment.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/',
    auth(UserRole.PATIENT),
    AppointmentController.createAppointment
);

router.get(
    '/my-appointment',
    auth(UserRole.DOCTOR, UserRole.PATIENT),
    AppointmentController.getMyAppointment
);

router.patch(
    '/status/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    AppointmentController.changeAppointmentStatus
);

export const AppointmentRoutes = router;