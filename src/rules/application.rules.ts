import { Request, Response } from "express";
import { Op } from "sequelize";
import { check } from 'express-validator';
import moment from 'moment';
import APPLICATION from "../models/application.model";
import { default_status, default_delete_status, check_length_TEXT } from '../config/config';

export const ApplicationRules = {
	forFindingApplicationInternal: [
		check('unique_id', "Unique Id is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.custom(async (unique_id: string, { req: Request }) => {
				const data = await APPLICATION.findOne({ where: { unique_id: unique_id } });
				if (!data) return Promise.reject('Application not found!');
			})
	],
	forFindingApplication: [
		check('unique_id', "Unique Id is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.custom(async (unique_id: string, { req: Request }) => {
				const data = await APPLICATION.findOne({ where: { unique_id: unique_id, status: default_status } });
				if (!data) return Promise.reject('Application not found!');
			})
	],
	forFindingApplicationFalsy: [
		check('unique_id', "Unique Id is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.custom(async (unique_id: string, { req: Request }) => {
				const data = await APPLICATION.findOne({ where: { unique_id: unique_id, status: default_delete_status } });
				if (!data) return Promise.reject('Application not found!');
			})
	],
	forFindingApplicationAlt: [
		check('application_unique_id', "Application Unique Id is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.custom(async (application_unique_id: string, { req: Request }) => {
				const data = await APPLICATION.findOne({ where: { unique_id: application_unique_id, status: default_status } });
				if (!data) return Promise.reject('Application not found!');
			})
	],
	forAdding: [
		check('type', "Type is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 50 })
			.withMessage("Invalid length (3 - 50) characters"),
		check('firstname', "Firstname is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 50 })
			.withMessage("Invalid length (3 - 50) characters"),
		check('middlename')
			.optional({ checkFalsy: false })
			.bail()
			.isString().isLength({ min: 3, max: 50 })
			.withMessage("Invalid length (3 - 50) characters"),
		check('lastname', "Lastname is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 50 })
			.withMessage("Invalid length (3 - 50) characters"),
		check('email', "Email is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isEmail()
			.withMessage('Invalid email format'),
			// .bail()
			// .custom(async (email: string, { req: Request }) => {
			// 	const data = await APPLICATION.findOne({ where: { email } });
			// 	if (data) return Promise.reject('Email already exists!');
			// }),
		check('phone_number', "Phone Number is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isMobilePhone('any')
			.withMessage('Invalid phone number'),
			// .bail()
			// .custom(async (phone_number: string, { req: Request }) => {
			// 	const data = await APPLICATION.findOne({ where: { phone_number } });
			// 	if (data) return Promise.reject('Phone number already exists!');
			// }),
		check('gender', "Gender is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 20 })
			.withMessage("Invalid length (3 - 20) characters"),
		check('date_of_birth', "Date of Birth is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.custom(date_of_birth => {
				const later = moment(date_of_birth, "YYYY-MM-DD", true);
				return later.isValid();
			})
			.withMessage("Invalid Date of Birth format (YYYY-MM-DD)"),
		check('nationality', "Nationality is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 50 })
			.withMessage("Invalid length (3 - 50) characters"),
		check('address', "Address is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 300 })
			.withMessage("Invalid length (3 - 300) characters"),
		check('guardian_name', "Guardian Name is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 200 })
			.withMessage("Invalid length (3 - 200) characters"),
		check('guardian_phone_number', "Guardian Phone Number is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isMobilePhone('any')
			.withMessage('Invalid guardian phone number'),
		check('guardian_address', "Guardian Address is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 300 })
			.withMessage("Invalid length (3 - 300) characters"),
		check('plan_name', "Plan Name is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 50 })
			.withMessage("Invalid length (3 - 50) characters"),
		check('plan_duration', "Plan Duration is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isInt()
			.custom(plan_duration => {
				if (plan_duration < 0) return false;
				else return true;
			})
			.withMessage("Plan Duration invalid"),
		check('plan_price', "Plan Price is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isFloat()
			.custom(plan_price => {
				if (plan_price < 0) return false;
				else return true;
			})
			.withMessage("Plan Price invalid"),
		check('proof_name', "Proof Name is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isString().isLength({ min: 3, max: 300 })
			.withMessage("Invalid length (3 - 300) characters"),
		check('proof_link', "Proof Link is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isURL()
			.withMessage("Value must be a specified url"),
		check('subject', "Subject is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isLength({ min: 2, max: 300 })
			.withMessage(`Invalid length (2 - ${300}) characters`),
		check('text')
			.optional({ checkFalsy: false })
			.bail()
			.isLength({ min: 2, max: check_length_TEXT })
			.withMessage(`Invalid length (2 - ${check_length_TEXT}) characters`),
		check('html', "HTML is required")
			.exists({ checkNull: true, checkFalsy: true })
			.bail()
			.isLength({ min: 2, max: check_length_TEXT })
			.withMessage(`Invalid length (2 - ${check_length_TEXT}) characters`),
	]
}