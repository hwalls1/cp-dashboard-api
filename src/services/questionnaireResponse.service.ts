import { QuestionResponse } from '../entities/questionResponse.entity';
import { QuestionnaireResponse } from '../entities/questionnaireResponse.entity';
import AppDataSource from '../utils/connectToDb';
import log from '../utils/logger';

const questionnaireResponsesRepository = AppDataSource.getRepository(
  QuestionnaireResponse
);

export const getAllQuestionnaireResponses = async (query: any) => {
  const questionnaireResponses =
    questionnaireResponsesRepository.createQueryBuilder(
      'questionnaireResponses'
    );

  if (query.dateResponded) {
    questionnaireResponses.andWhere({
      dateResponded: query.dateResponded,
    });
  }

  if (query.userId) {
    questionnaireResponses.andWhere({
      user: {
        id: query.userId
      }
    });
  }

  questionnaireResponses.leftJoinAndSelect(
    'questionnaireResponses.questionResponses',
    'questionResponses'
  );

  questionnaireResponses.leftJoinAndSelect(
    'questionnaireResponses.user',
    'user'
  );

  questionnaireResponses.leftJoinAndSelect(
    'questionnaireResponses.questionnaire',
    'questionnaire'
  );

  return await questionnaireResponses.getMany();
};

export const getOneQuestionnaireResponse = async (id: number) => {
  try {
    const questionnaireResponse =
      questionnaireResponsesRepository.createQueryBuilder(
        'questionnaireResponses'
      );

    questionnaireResponse.andWhere({
      id: id,
    });

    questionnaireResponse.leftJoinAndSelect(
      'questionnaireResponses.questionResponses',
      'questionResponses'
    );

    questionnaireResponse.leftJoinAndSelect(
      'questionnaireResponses.user',
      'user'
    );

    questionnaireResponse.leftJoinAndSelect(
      'questionnaireResponses.questionnaire',
      'questionnaire'
    );

    return await questionnaireResponse.getOneOrFail();
  } catch (error) {
    return error;
  }
};

export const createQuestionnaireResponse = async (
  input: Partial<QuestionnaireResponse>
) => {
  return questionnaireResponsesRepository.save(
    questionnaireResponsesRepository.create(input)
  );
};

export const updateQuestionnaireResponse = async (
  input: Partial<QuestionnaireResponse>,
  id: number
) => {
  const { dateResponded, questionResponses } = input;

  const questionnaireResponse =
    await questionnaireResponsesRepository.findOneOrFail({
      where: {
        id: id,
      },
    });

  questionnaireResponse.dateResponded = dateResponded as string;
  questionnaireResponse.questionResponses =
    questionResponses as QuestionResponse[];

  await questionnaireResponsesRepository.save(questionnaireResponse);
};

export const deleteQuestionnaireResponse = async (id: number) => {
  await questionnaireResponsesRepository.delete(id);
};
