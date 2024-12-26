import { Model, Table, Column, DataType } from "sequelize-typescript";
import { db_end, db_start } from "../config/config";

export interface IApplication {
	id?: number;
	unique_id?: string;
	type?: string;
	firstname?: string;
	middlename?: string;
	lastname?: string;
	email?: string;
	phone_number?: string;
	gender?: string;
	date_of_birth?: string;
	nationality?: string;
	address?: string;
	guardian_name?: string;
	guardian_phone_number?: string;
	guardian_address?: string;
	plan_name?: string;
	plan_duration?: number;
	plan_price?: number;
	proof_name?: string;
	proof_link?: string;
	status?: number;
}

@Table({
	tableName: `${db_start}applications${db_end}`
})
export default class Application extends Model {
	@Column({
		type: DataType.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	})
	id?: number;

	@Column({
		type: DataType.STRING(40),
		allowNull: false,
		unique: true,
		field: "unique_id"
	})
	unique_id?: string;
	
	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		field: "type"
	})
	type?: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		field: "firstname"
	})
	firstname?: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: true,
		field: "middlename"
	})
	middlename?: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		field: "lastname"
	})
	lastname?: string;

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		field: "email"
	})
	email?: string;
	
	@Column({
		type: DataType.STRING(20),
		allowNull: false,
		field: "phone_number"
	})
	phone_number?: string;

	@Column({
		type: DataType.STRING(20),
		allowNull: false,
		field: "gender"
	})
	gender?: string;

	@Column({
		type: DataType.DATEONLY,
		allowNull: false,
		field: "date_of_birth"
	})
	date_of_birth?: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: true,
		field: "nationality"
	})
	nationality?: string;

	@Column({
		type: DataType.STRING(300),
		allowNull: true,
		field: "address"
	})
	address?: string;

	@Column({
		type: DataType.STRING(200),
		allowNull: false,
		field: "guardian_name"
	})
	guardian_name?: string;

	@Column({
		type: DataType.STRING(20),
		allowNull: false,
		field: "guardian_phone_number"
	})
	guardian_phone_number?: string;

	@Column({
		type: DataType.STRING(300),
		allowNull: true,
		field: "guardian_address"
	})
	guardian_address?: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		field: "plan_name"
	})
	plan_name?: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		field: "plan_duration"
	})
	plan_duration?: number;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
		field: "plan_price"
	})
	plan_price?: number;

	@Column({
		type: DataType.STRING(300),
		allowNull: false,
		field: "proof_name"
	})
	proof_name?: string;

	@Column({
		type: DataType.STRING(300),
		allowNull: false,
		field: "proof_link"
	})
	proof_link?: string;

	@Column({
		type: DataType.INTEGER({ length: 1 }),
		field: "status"
	})
	status?: number;
}