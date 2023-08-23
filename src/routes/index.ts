require('dotenv').config();
import config from 'config';
import express from 'express';
import user from './user.routes';
import auth from './auth.routes';
import ticket from './ticket.routes';
import question from './question.routes';
import coach from './coach.routes';
import athlete from './athlete.routes';
import athleteSchedule from './athleteSchedule.routes';
import workout from './workout.routes';
import completedWorkout from './completedWorkout.routes';
import assessment from './assessment.routes';
import assessmentItem from './assessmentItem.routes';
import exercise from './exercise.routes';
import completedExercises from './completedExercise.routes';
import pitch from './pitch.routes';
import setting from './setting.routes';
import questionnaire from './questionnaire.routes';
import questionnaireResponse from './questionnaireResponse.routes';
import assessmentResponse from './assessmentResponse.routes';
import upload from './upload.routes';
import message from './message.routes';
import chats from './chat.routes';
import files from './file.routes';

const router = express.Router();

router.get('/api/healthcheck', async (_, res) => {
  const organization = config.get<string>('organization');

  res.status(200).json({
    status: 'success',
    organization: organization
  });
});

router.use(user);
router.use(auth);
router.use(ticket);
router.use(question);
router.use(coach);
router.use(athlete);
router.use(athleteSchedule);
router.use(workout);
router.use(completedWorkout);
router.use(assessment);
router.use(assessmentItem);
router.use(exercise);
router.use(completedExercises);
router.use(pitch);
router.use(setting);
router.use(questionnaire);
router.use(questionnaireResponse);
router.use(upload);
router.use(assessmentResponse);
router.use(message);
router.use(chats);
router.use(files);

export default router;
