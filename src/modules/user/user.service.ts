import { pool } from "../../db";



const createUserIntoDB = async (payload: any) => {
    // console.log(payload);
    // const { name, email, password, role } = payload;

    // const result = await pool.query(`
    //         INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *
    //     `, [name, email, password, role]);
    //     console.log("after inserting: ",result)// akhan asche na keno?
    //     return result;

        console.log("Payload:", payload);

        const { name, email, password, role } = payload;

        const result = await pool.query(
            `
      INSERT INTO users(name, email, password, role)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
            [name, email, password, role]
        );

        return result;
}

export const userService = {
    createUserIntoDB
}