import { AssessmentItemResponse } from "../entities/assessmentItemResponse.entity";
import { AssessmentResponse } from "../entities/assessmentResponse.entity";
import AppDataSource from "../utils/connectToDb";
import log from "../utils/logger";

const assessmentResponseRepository = AppDataSource.getRepository(
    AssessmentResponse
);

export const getAllAssessmentResponses = async (query: any) =>  {
    const assessmentResponses = 
        assessmentResponseRepository.createQueryBuilder(
            'assessmentResponses'
        );

    if (query.dateResponded)    {
        assessmentResponses.andWhere({
            dateResponsed: query.dateResponded,
        });
    }

    if (query.athleteId)   {
        assessmentResponses.andWhere({
            athlete:   {
                id: query.athleteId
            }
        });
    }

    assessmentResponses.leftJoinAndSelect(
        'assessmentResponses.assessmentItemResponses',
        'assessmentItemResponses'
    );

    assessmentResponses.leftJoinAndSelect(
        'assessmentResponses.athlete',
        'athlete'
    );

    assessmentResponses.leftJoinAndSelect(
        'assessmentResponses.assessment',
        'assessment'
    );

    return await assessmentResponses.getMany();
};

export const getOneAssessmentResponse = async (id: number) =>   {
    try  {
        const assessmentResponse = assessmentResponseRepository.findOneOrFail({
            where: {
              id: id,
            },
            relations: ['assessmentItemResponses', 'assessmentItemResponses.assessmentItem', 'assessment'],
        });
        return await assessmentResponse;
    } catch (error) {
        return error;
    }
};

export const createAssessmentResponse = async   (
    input: Partial<AssessmentResponse>
) =>    {
    return assessmentResponseRepository.save(
        assessmentResponseRepository.create(input)
    );
};

export const updateAssessmentResponse = async (
    input: Partial<AssessmentResponse>,
    id: number
) =>    {
    const { dateResponded, assessmentItemResponses } = input;

    const assessmentResponse = 
        await assessmentResponseRepository.findOneOrFail({
            where: {
                id: id,
            },
        });

    assessmentResponse.dateResponded = dateResponded as string;
    assessmentResponse.assessmentItemResponses = 
        assessmentItemResponses as AssessmentItemResponse[];

    await assessmentResponseRepository.save(assessmentResponse);
};

export const deleteAssessmentResponse = async (id: number) =>   {
    await assessmentResponseRepository.delete(id);
}