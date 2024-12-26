import { Request, Response } from "express";
import { Op } from "sequelize";
import { validationResult, matchedData } from 'express-validator';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import APPLICATION, { IApplication } from "../models/application.model";
import { IGetAuthTypesRequest } from "../middleware/checks";
import { ServerError, SuccessResponse, ValidationError, OtherSuccessResponse, NotFoundError, BadRequestError, logger } from '../common/index';
import {
	IPagination, ISearch, default_status, mailer_url, paginate, return_all_letters_uppercase, getFileExtension
} from '../config/config';
import dotenv from 'dotenv';
dotenv.config();

const {
	cloud_mailer_key, host_type, smtp_host, cloud_mailer_username, cloud_mailer_password, from_email, to_email
} = process.env;

export default class ApplicationController {
	async getApplications(req: IGetAuthTypesRequest, res: Response) {
		const api_key: string = req.API_KEY;
		
		const queryParams: IPagination = req.query;

		const total_records = await APPLICATION.count();
		const pagination = paginate(queryParams.page || parseInt(req.body.page), queryParams.size || parseInt(req.body.size), total_records);
		const orderBy = queryParams.orderBy || req.body.orderBy || "createdAt";
		const sortBy = return_all_letters_uppercase(queryParams.sortBy) || return_all_letters_uppercase(req.body.sortBy) || "DESC";

		try {
			const response = await APPLICATION.findAndCountAll({
				attributes: { exclude: ['id'] },
				order: [
					[orderBy, sortBy]
				],
				distinct: true,
				offset: pagination.start,
				limit: pagination.limit
			});

			if (response.count === 0) {
				SuccessResponse(res, { unique_id: api_key, text: "Applications Not found" }, []);
			} else {
				SuccessResponse(res, { unique_id: api_key, text: "Applications loaded" }, { ...response, pages: pagination.pages });
			}
		} catch(err: any) {
			ServerError(res, { unique_id: api_key, text: err.message }, null);
		}
	}

	async searchApplications(req: IGetAuthTypesRequest, res: Response) {
		const api_key: string = req.API_KEY;
		
		const queryParams: IPagination = req.query;

		const total_records = await APPLICATION.count({
			where: {
				[Op.or]: [
					{ 
						type: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
					},
					{ 
						firstname: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
					},
					{ 
						lastname: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
					},
					{ 
						middlename: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
					},
					{ 
						email: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
					},
					{ 
						phone_number: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
					},
				]
			}
		});
		const pagination = paginate(queryParams.page || parseInt(req.body.page), queryParams.size || parseInt(req.body.size), total_records);
		const orderBy = queryParams.orderBy || req.body.orderBy || "createdAt";
		const sortBy = return_all_letters_uppercase(queryParams.sortBy) || return_all_letters_uppercase(req.body.sortBy) || "DESC";

		try {
			const response = await APPLICATION.findAndCountAll({
				attributes: { exclude: ['id'] },
				where: {
					[Op.or]: [
						{
							type: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
						},
						{
							firstname: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
						},
						{
							lastname: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
						},
						{
							middlename: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
						},
						{
							email: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
						},
						{
							phone_number: { [Op.or]: { [Op.like]: `%${queryParams.search}`, [Op.startsWith]: `${queryParams.search}`, [Op.endsWith]: `${queryParams.search}`, [Op.substring]: `${queryParams.search}` } }
						},
					]
				}, 
				order: [
					[orderBy, sortBy]
				],
				distinct: true,
				offset: pagination.start,
				limit: pagination.limit
			});

			if (response.count === 0) {
				SuccessResponse(res, { unique_id: api_key, text: "Applications Not found" }, []);
			} else {
				SuccessResponse(res, { unique_id: api_key, text: "Applications loaded" }, { ...response, pages: pagination.pages });
			}
		} catch(err: any) {
			ServerError(res, { unique_id: api_key, text: err.message }, null);
		}
	}

	async addApplication(req: IGetAuthTypesRequest, res: Response) {
		const api_key: string = req.API_KEY;

		const errors = validationResult(req);
		const payload = matchedData(req);

		if (!errors.isEmpty()) {
			ValidationError(res, { unique_id: api_key, text: "Validation Error Occured" }, errors.array())
		} else {
			try {
				const mailer_response = await axios.post(
					`${mailer_url}/send`,
					host_type === "GOOGLE" ? {
						host_type: host_type,
						username: cloud_mailer_username,
						password: cloud_mailer_password,
						from_email: from_email,
						to_email: to_email,
						// to_email: payload.email,
						subject: payload.subject,
						text: payload.text,
						html: payload.html,
						attachments: [
							{
								filename: payload.proof_name + "." + getFileExtension(payload.proof_link),
								path: payload.proof_link
							}
						]
					} :
						{
							host_type: host_type,
							smtp_host: smtp_host,
							username: cloud_mailer_username,
							password: cloud_mailer_password,
							from_email: from_email,
							to_email: to_email,
							// to_email: payload.email,
							subject: payload.subject,
							text: payload.text,
							html: payload.html,
							attachments: [
								{
									filename: payload.proof_name + "." + getFileExtension(payload.proof_link),
									path: payload.proof_link
								}
							]
						},
					{
						headers: {
							'mailer-access-key': cloud_mailer_key
						}
					}
				);

				if (mailer_response.data.success) {
					if (mailer_response.data.data === null) {
						BadRequestError(res, { unique_id: api_key, text: "No data found" }, null);
					} else {
						const application = await APPLICATION.create(
							{
								unique_id: uuidv4(),
								type: payload.type,
								firstname: payload.firstname,
								middlename: payload.middlename ? payload.middlename : null,
								lastname: payload.lastname,
								email: payload.email,
								phone_number: payload.phone_number,
								gender: payload.gender,
								date_of_birth: payload.date_of_birth,
								nationality: payload.nationality,
								address: payload.address,
								guardian_name: payload.guardian_name,
								guardian_phone_number: payload.guardian_phone_number,
								guardian_address: payload.guardian_address,
								plan_name: payload.plan_name,
								plan_duration: parseInt(payload.plan_duration),
								plan_price: parseFloat(payload.plan_price),
								proof_name: payload.proof_name,
								proof_link: payload.proof_link,
								status: default_status
							}
						);

						if (application) {
							SuccessResponse(res, { unique_id: api_key, text: "Application added successfully!" }, null);
						} else {
							BadRequestError(res, { unique_id: api_key, text: "Error adding application" }, null);
						}
					}
				} else {
					BadRequestError(res, { unique_id: api_key, text: mailer_response.data.message }, null);
				}
			} catch (err: any) {
				ServerError(res, { unique_id: api_key, text: err.response.data.message ? err.response.data.message : err.message }, null);
			}
		}
	}

	async deleteApplication(req: IGetAuthTypesRequest, res: Response) {
		const api_key: string = req.API_KEY;

		const errors = validationResult(req);
		const payload = matchedData(req);

		if (!errors.isEmpty()) {
			ValidationError(res, { unique_id: api_key, text: "Validation Error Occured" }, errors.array())
		} else {
			try {
				const application = await APPLICATION.destroy(
					{
						where: {
							unique_id: payload.unique_id,
							status: default_status
						}
					}
				);

				if (application > 0) {
					SuccessResponse(res, { unique_id: api_key, text: "Application was deleted successfully!" });
				} else {
					BadRequestError(res, { unique_id: api_key, text: "Error deleting record" }, null);
				}
			} catch (err: any) {
				ServerError(res, { unique_id: api_key, text: err.message }, null);
			}
		}
	}
};
