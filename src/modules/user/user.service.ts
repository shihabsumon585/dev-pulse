import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { ILogin, IUser } from "./user.interface";
import jwt from "jsonwebtoken";
import config from "../../config/index";



const createUserIntoDB = async (payload: IUser) => {

        const { name, email, password, role } = payload;

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `
      INSERT INTO users(name, email, password, role)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
            [name, email, hashPassword, role]
        );

        return result;
}

const userLoginResponceIntoDB = async (payload: ILogin) => {
    const {email, password} = payload;
    password as string;

    const result = await pool.query(`
            SELECT * FROM users WHERE email=$1
        `, [email])
        
        const user = result.rows[0];

        if (!user || user === undefined || user === null) {
            throw new Error("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(password.toString(), user.password);
        
        if (!isPasswordMatch) {
            throw new Error("Invalid password");
        }

        const tokenPayload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        delete result.rows[0].password;

        return result.rows[0];
}

export const userService = {
    createUserIntoDB,
    userLoginResponceIntoDB
}