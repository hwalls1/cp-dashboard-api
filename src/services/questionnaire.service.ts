import { Question } from '../entities/question.entity';
import { Questionnaire } from '../entities/questionnaire.entity';
import AppDataSource from '../utils/connectToDb';
import log from '../utils/logger';

const questionnaireRepository = AppDataSource.getRepository(Questionnaire);

export const getAllQuestionnaires = async (query: any) => {
  const questionnaires =
    questionnaireRepository.createQueryBuilder('questionnaires');

  if (query.dateToShow) {
    questionnaires.andWhere({
      dateToShow: query.dateToShow,
    });
  }

  if (query.exclude) {
    questionnaires.andWhere('questionnaires.id NOT IN (:exclude)', {
      exclude: query.exclude.split(',').map((id: String) => Number(id)),
    });
  }

  questionnaires.leftJoinAndSelect('questionnaires.questions', 'questions');
  return await questionnaires.getMany();
};

export const getOneQuestionnaire = async (id: number) => {
  return await questionnaireRepository.findOne({
    where: {
      id,
    },
    relations: {
      questions: true,
    },
  });
};

export const createQuestionnaire = async (input: Partial<Questionnaire>) => {
  return questionnaireRepository.save(questionnaireRepository.create(input));
};

export const updateQuestionnaire = async (
  input: Partial<Questionnaire>,
  id: number
) => {
  const { title, dateToShow, questions } = input;

  const questionnaire = await questionnaireRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  questionnaire.title = title as string;
  questionnaire.dateToShow = dateToShow as string;
  questionnaire.questions = questions as Question[];

  await questionnaireRepository.save(questionnaire);
};

export const deleteQuestionnaire = async (id: number) => {
  await questionnaireRepository.delete(id);
};
