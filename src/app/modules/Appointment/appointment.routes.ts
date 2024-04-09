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

export const AppointmentRoutes = router;