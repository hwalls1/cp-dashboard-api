import AppDataSource from './connectToDb';
import { Coach } from '../entities/coach.entity';
import { Exercise, ExerciseType } from '../entities/exercise.entity';
import { Ticket } from '../entities/ticket.entity';
import { RoleEnumType, StatusEnumType, User } from '../entities/user.entity';
import { Workout, WorkoutType } from '../entities/workout.entity';
import { Athlete, LevelType, HandedType } from '../entities/athlete.entity';
import { AthleteSchedule } from '../entities/athleteSchedule.entity';
import { format, subDays, subMonths } from 'date-fns';
import {
  CompletedWorkout,
  CompletedWorkoutType,
} from '../entities/completedWorkout.entity';
import {
  CompletedExercise,
  CompletedExerciseType,
} from '../entities/completedExercise.entity';
import { Pitch, PitchType, ThrowType } from '../entities/pitch.entity';
import { Question, ResponseType } from '../entities/question.entity';
import { Questionnaire } from '../entities/questionnaire.entity';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { File } from '../entities/file.entity';
import { Assessment } from '../entities/assessment.entity';
import { AssessmentItem } from '../entities/assessmentItem.entity';

const DB = AppDataSource;

const clearDB = async () => {
  const entities = DB.entityMetadatas;
  for (const entity of entities) {
    const repository = DB.getRepository(entity.name);
    await repository.query(
      `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
    );
  }
};

const createUser = async () => {
  const user = new User();
  user.name = 'admin';
  user.password = 'admin';
  // Hashing of password will happen via typeorm on `insert`
  user.role = RoleEnumType.ADMIN;
  user.email = 'admin@example.com';
  user.verified = true;
  user.status = StatusEnumType.APPROVED;


  await DB.getRepository(User).save(user);


  const user2 = new User();
  user2.name = 'Mason Feole';
  user2.password = 'password';
  user2.role = RoleEnumType.ATHLETE;
  user2.email = 'mfeole@connected-performance.com';
  user2.verified = true;
  user2.status = StatusEnumType.APPROVED;


  await DB.getRepository(User).save(user2);


  await createChats(user, user2);

  await createFiles(user)


  return user;
};

const createFiles = async (user: User) => {
  const file = new File();
  file.owner = user;
  file.dateUploaded = format(new Date(), 'yyyy-MM-dd');
  file.name = "my-first-file.jpg";
  file.description = "Me throwing";
  file.src = "https://cpuploads.s3.amazonaws.com/Rectangle%2046.png";

  await DB.getRepository(File).save(file);

}

const createCoachAndTicket = async ( ) => {
  const user = new User();
  user.name = 'coach';
  user.password = 'password';
  user.role = RoleEnumType.COACH;
  user.email = 'coach@example.com';
  user.verified = true;  
  user.status = StatusEnumType.APPROVED;


  await DB.getRepository(User).save(user);

  const coach = new Coach();
  coach.user = user;
  coach.organization = "Connected Performance";
  await DB.getRepository(Coach).save(coach);

  createCompletedWorkout( coach );


  const user2 = new User();
  user2.name = 'Big Fella';
  user2.password = 'password';
  user2.role = RoleEnumType.ATHLETE;
  user2.email = 'bfella@connected-performance.com';
  user2.verified = true;
  user2.status = StatusEnumType.APPROVED;


  await DB.getRepository(User).save(user2);


  // creates a ticket and assigns it to the proper users
  const ticket = new Ticket();
  ticket.subject = 'Help Me';
  ticket.sender = user2.id;
  ticket.recipient = user.id;
  ticket.body = "I can't do anything";

  await DB.getRepository(Ticket).save(ticket);

};

const createCompletedWorkout = async ( coach: Coach ) => {
  const user = new User();
  user.name = 'Will Nahmens';
  user.password = 'password';
  user.role = RoleEnumType.ATHLETE;
  user.email = 'nahmens@connected-performance.com';
  user.verified = true;
  user.status = StatusEnumType.APPROVED;

  await DB.getRepository(User).save(user);

  const athlete = new Athlete();
  athlete.user = user;
  athlete.level = LevelType.PROFESSIONAL;
  athlete.height = "5'11";
  athlete.handed = HandedType.RIGHT;
  athlete.weight = Number(185);
  athlete.organization = 'Oxy';
  athlete.coach = coach;

  const athleteSchedule = new AthleteSchedule();
  athleteSchedule.athlete = athlete;
  athleteSchedule.workouts = '';
  await DB.getRepository(AthleteSchedule).save(athleteSchedule);

  athlete.athleteSchedule = athleteSchedule;
  await DB.getRepository(Athlete).save(athlete);

  const completedWorkout = new CompletedWorkout();
  completedWorkout.title = 'Reliever Lift Day 1';
  completedWorkout.type = CompletedWorkoutType.MOBILITY;
  completedWorkout.athlete = athlete;

  const completedExercise = new CompletedExercise();
  completedExercise.exerciseId = 1;
  completedExercise.title = 'Bench Press';
  completedExercise.date = '2023-02-15';
  completedExercise.type = CompletedExerciseType.WEIGHTED;
  completedExercise.athlete = athlete;
  completedExercise.sets = 8;
  completedExercise.reps = 5;
  completedExercise.prescribedWeight = 165;
  completedExercise.recordedValue = 170;
  completedExercise.completedWorkout = completedWorkout;

  const completedExercise2 = new CompletedExercise();
  completedExercise2.exerciseId = 1;
  completedExercise2.title = 'Bench Press';
  completedExercise2.date = '2023-03-01';
  completedExercise2.type = CompletedExerciseType.WEIGHTED;
  completedExercise2.athlete = athlete;
  completedExercise2.sets = 8;
  completedExercise2.reps = 5;
  completedExercise2.prescribedWeight = 165;
  completedExercise2.recordedValue = 182;
  completedExercise2.completedWorkout = completedWorkout;

  const completedExercise3 = new CompletedExercise();
  completedExercise3.exerciseId = 1;
  completedExercise3.title = 'Bench Press';
  completedExercise3.date = '2023-03-10';
  completedExercise3.type = CompletedExerciseType.WEIGHTED;
  completedExercise3.athlete = athlete;
  completedExercise3.sets = 8;
  completedExercise3.reps = 5;
  completedExercise3.prescribedWeight = 165;
  completedExercise3.recordedValue = 193;
  completedExercise3.completedWorkout = completedWorkout;

  const completedExercise4 = new CompletedExercise();
  completedExercise4.exerciseId = 2;
  completedExercise4.title = 'Arnolds';
  completedExercise4.date = '2023-02-15';
  completedExercise4.type = CompletedExerciseType.WEIGHTED;
  completedExercise4.athlete = athlete;
  completedExercise4.sets = 8;
  completedExercise4.reps = 5;
  completedExercise4.prescribedWeight = 35;
  completedExercise4.recordedValue = 30;
  completedExercise4.completedWorkout = completedWorkout;

  const completedExercise5 = new CompletedExercise();
  completedExercise5.exerciseId = 2;
  completedExercise5.title = 'Arnolds';
  completedExercise5.date = '2023-03-01';
  completedExercise5.type = CompletedExerciseType.WEIGHTED;
  completedExercise5.athlete = athlete;
  completedExercise5.sets = 8;
  completedExercise5.reps = 5;
  completedExercise5.prescribedWeight = 40;
  completedExercise5.recordedValue = 40;
  completedExercise5.completedWorkout = completedWorkout;

  const completedExercise6 = new CompletedExercise();
  completedExercise6.exerciseId = 2;
  completedExercise6.title = 'Arnolds';
  completedExercise6.date = '2023-03-10';
  completedExercise6.type = CompletedExerciseType.WEIGHTED;
  completedExercise6.athlete = athlete;
  completedExercise6.sets = 8;
  completedExercise6.reps = 5;
  completedExercise6.prescribedWeight = 40;
  completedExercise6.recordedValue = 42;
  completedExercise6.completedWorkout = completedWorkout;

  completedWorkout.completedExercises = [
    completedExercise,
    completedExercise2,
    completedExercise3,
    completedExercise4,
    completedExercise5,
    completedExercise6,
  ];

  await DB.getRepository(CompletedWorkout).save(completedWorkout);

  await createPitches(athlete, completedWorkout);
};

const createExercise = async () => {
  const exercise = new Exercise();

  exercise.name = 'benchPress';
  exercise.title = 'Bench Press';
  exercise.type = ExerciseType.WEIGHTED;
  exercise.description = 'lift weights for 10 mins';
  exercise.link = 'https://www.youtube.com/watch?v=YKotm76Iz9E';
  exercise.notes = 'get a sick pump';

  await DB.getRepository(Exercise).save(exercise);
};

const createWorkout = async () => {
  // make the new instance of the workout, and the three exercises in it
  const workout = new Workout();
  const workout2 = new Workout();
  const exercise01 = new Exercise();
  const exercise02 = new Exercise();
  const exercise03 = new Exercise();

  // first exercise
  exercise01.name = 'arnolds';
  exercise01.title = 'Arnolds';
  exercise01.type = ExerciseType.WEIGHTED;
  exercise01.description = 'liftweightsfor10mins';
  exercise01.link = 'https://www.youtube.com/watch?v=DoMYVSPjsME';
  exercise01.notes = 'goodworkout';
  exercise01.sets = 8;
  exercise01.reps = 5;

  // second exercise
  exercise02.name = 'pecFlyIso';
  exercise02.title = 'Pec Fly ISO Stretch';
  exercise02.type = ExerciseType.TIMED;
  exercise02.description = 'liftweightsfor10mins';
  exercise02.link = 'https://www.youtube.com/watch?v=DoMYVSPjsME';
  exercise02.notes = 'goodworkout';
  exercise02.sets = 8;
  exercise02.reps = 5;

  // third exercise
  exercise03.name = 'explosivePushUp';
  exercise03.title = 'Explosive Push Up';
  exercise03.type = ExerciseType.BODYWEIGHT;
  exercise03.description = 'liftweightsfor10mins';
  exercise03.link = 'https://www.youtube.com/watch?v=DoMYVSPjsME';
  exercise03.notes = 'goodworkout';
  exercise03.sets = 8;
  exercise03.reps = 5;

  // array to hold exercises
  // let exercises: Exercise[] = [exercise01, exercise02, exercise03];

  // add the info and exercises to the workout
  workout.name = 'upperBodyDiesel';
  workout.title = 'Upper Body Diesel';
  workout.type = WorkoutType.LIFT;
  workout.description = 'lift weights for 10 mins';
  workout.notes = 'this was a good workout';
  workout.exercises = [exercise01, exercise02, exercise03];

  await DB.getRepository(Workout).save(workout);

  // add the info and exercises to the workout
  workout2.name = 'backBridge';
  workout2.title = 'Back Bridge';
  workout2.type = WorkoutType.MOBILITY;
  workout2.description = 'do a back bridge';
  workout2.notes = 'this was a good workout';
  workout2.exercises = [exercise02];

  await DB.getRepository(Workout).save(workout2);

  // add the info and exercises to the workout
  workout2.name = 'backBridge';
  workout2.title = 'Back Bridge';
  workout2.type = WorkoutType.MOBILITY;
  workout2.description = 'do a back bridge';
  workout2.notes = 'this was a good workout';
  workout2.exercises = [exercise02, exercise03];

  await DB.getRepository(Workout).save(workout2);

  // add the info and exercises to the workout
  workout2.name = 'backBridge';
  workout2.title = 'Back Bridge';
  workout2.type = WorkoutType.MOBILITY;
  workout2.description = 'do a back bridge';
  workout2.notes = 'this was a good workout';
  workout2.exercises = [exercise02, exercise03];

  await DB.getRepository(Workout).save(workout2);

  await DB.getRepository(Workout).save(workout);

  const user = new User();
  user.name = 'Test McGee';
  user.password = 'password';
  user.role = RoleEnumType.ATHLETE;
  user.email = 'athlete@connected-performance.com';
  user.verified = true;
  user.status = StatusEnumType.APPROVED;

  const athlete = new Athlete();
  athlete.user = user;
  athlete.level = LevelType.PROFESSIONAL;
  athlete.height = "5'11";
  athlete.handed = HandedType.RIGHT;
  athlete.weight = Number(185);
  athlete.organization = 'Oxy';

  const athleteSchedule = new AthleteSchedule();
  athleteSchedule.workouts = JSON.stringify([
    {
      ...workout,
      start: format(new Date(), 'yyyy-MM-dd'),
      exercises: [
        {
          ...exercise01,
          sets: 8,
          reps: 5,
          prescribedWeight: 190,
        },
        {
          ...exercise02,
          sets: 3,
          reps: 5,
          prescribedWeight: 45,
        },
        {
          ...exercise03,
          sets: 5,
          reps: 5,
          prescribedWeight: 0,
        },
      ],
    },
    {
      ...workout2,
      start: format(new Date(), 'yyyy-MM-dd'),
      exercises: [
        {
          ...exercise02,
          sets: 3,
          reps: 5,
          prescribedWeight: 45,
        },
        {
          ...exercise03,
          sets: 5,
          reps: 5,
          prescribedWeight: 0,
        },
      ],
    },
  ]);
  athleteSchedule.athlete = athlete;

  user.athlete = athlete;

  await DB.getRepository(Athlete).save(athlete);
  await DB.getRepository(User).save(user);
  await DB.getRepository(AthleteSchedule).save(athleteSchedule);
};

const createPitches = async (
  athlete: Athlete,
  completedWorkout: CompletedWorkout
) => {
  let date = new Date();
  for (let index = 0; index < 60; index++) {
    const pitch = new Pitch();
    pitch.athlete = athlete;
    date = subDays(date, 1);
    pitch.date = format(date, 'Y-m-d');
    let rand = Math.random();
    rand = Math.floor(rand * 20);
    rand = rand + 70;
    pitch.velocity = rand;
    pitch.type = PitchType.FASTBALL;
    pitch.throwType = ThrowType.MOUND;
    pitch.distance = 5;
    pitch.completedWorkout = completedWorkout;

    DB.getRepository(Pitch).save(pitch);
  }
};

const createQuestionnaire = async () => {
  const question = new Question();
  question.question = "How much?";
  question.responseType = ResponseType.NUMBER;

  const question2 = new Question();
  question2.question = "How ready do you feel to throw today?";
  question2.responseType = ResponseType.SCALE;

  const question3 = new Question();
  question3.question = "Did you sleep last night?";
  question3.responseType = ResponseType.BOOLEAN;

  const questionnaire = new Questionnaire();
  questionnaire.title = "Questionnaire 1";
  questionnaire.questions = [question, question2, question3];
  questionnaire.dateToShow = format(new Date(), "Y-M-d");

  DB.getRepository(Questionnaire).save(questionnaire);

}

const createChats = async (user1: User, user2: User) => {
  const chat = new Chat();
  chat.users = [user1, user2];

  const message = new Message();
  message.sender = user1;
  message.recipient = user2;
  message.body = "Are you getting this?";

  const message2 = new Message();
  message2.sender = user2;
  message2.recipient = user1;
  message2.body = "You bet your bottom dollar I am!";

  chat.messages = [message, message2];

  DB.getRepository(Chat).save(chat);

}

const createAssessment = async () => {
  const assessment = new Assessment();
  const assessmentItem = new AssessmentItem();
  assessmentItem.title = "Toe Touch";
  assessmentItem.type = "passFail";
  assessment.title = "Ass 1";
  assessment.type = "mobility";
  assessment.assessmentItems = [assessmentItem];

  DB.getRepository(Assessment).save(assessment);
}

const dropDB = async () => {
  await DB.destroy();
};

export const seedDb = async () => {
  await clearDB();
  await createUser();
  await createCoachAndTicket();
  await createExercise();
  await createWorkout();
  await createQuestionnaire();
  await createAssessment();
};
