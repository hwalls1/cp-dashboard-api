import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';
import {
    createAssessmentResponse,
    getAllAssessmentResponses,
    getOneAssessmentResponse,
    updateAssessmentResponse,
    deleteAssessmentResponse
} from '../services/assessmentResponse.service';
import { NetConnectOpts } from 'net';

export async function getAllAssessmentResponsesHandler(
    req: Request, 
    res: Response
)   {
    const assessmentResponses = await getAllAssessmentResponses(req.query);

    return res.send(assessmentResponses);
}

export async function getOneAssessmentResponseHandler(
    req: Request,
    res: Response
)   {
    const id = Number(req.params.id);
    console.log(id)
    const assessmentResponse = await getOneAssessmentResponse(id);

    return res.send(assessmentResponse);
}

export async function createAssessmentResponseHandler(
    req: Request,
    res: Response,
    next: NextFunction
)   {
    const body = req.body;

    try  {
        const assessmentResponse = await createAssessmentResponse(body);

        return res.send({
            message: 'Assessment Response created successfully',
            assessmentResponse: assessmentResponse,
        });
    } catch (err: any)  {
        log.error(err);
        return next(
            createAppError(
                HttpCode.BAD_REQUEST,
                'Could not create the assessmentResponse'
            )
        );
    }
};

export async function updateAssessmentResponseHandler(
    req: Request,
    res: Response,
    next: NextFunction
)   {
    const body = req.body;
    const id = Number(req.params.id);

    log.info(`ID: ${id}`);

    try {
        await updateAssessmentResponse(body, id);
        log.info(`Assessmert Response: ${id} updated successfully`);
        res.send('Assessment Response updated successfully');
    } catch (err: any)  {
        log.error(`Could not update Assessment Response ${id}`);
        return next(
            createAppError(
                HttpCode.BAD_REQUEST,
                'Could not update the Assessment Response'
            )
        );
    }
};

export async function deleteAssessmentResponseHandler(
    req: Request, 
    res: Response,
    next: NextFunction
)   {
    const id = Number(req.params.id);

    try  { 
        await deleteAssessmentResponse(id);
        log.info(`Assessment Response: ${id} deleted successfully`);
        return res.send('Assessment Response deleted successfully');

    } catch (err: any)  {
        log.error(`Could not delete Assessment Response ${id}`);
        return next(
            createAppError(
                HttpCode.BAD_REQUEST,
                'Could not delete the Assessment Response'
            )
        );
    }
}