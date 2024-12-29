import { Pool, QueryResult, PoolClient } from "pg";
import { Result } from "@/models/result";

interface DBResult extends Result {
    payload: QueryResult<any> | null;
};

const pool = new Pool({ idleTimeoutMillis: 30000 });
pool.on("error", (error: Error, client: PoolClient) => {
    console.error(error);
});

export async function query(
    text: string,
    params: any[]
): Promise<DBResult> {
    const result: DBResult = {
        err: "",
        payload: null
    };

    let client;
    let err;
    try {
        client = await pool.connect();

        if (!client)
            throw new Error("Client acquisition from pool failed unexpectedly");

        result.payload = await client.query(text, params);
    } catch (error) {
        result.err = `${err}`;
        console.error(error);
    } finally {
        if (client)
            client.release();
    }

    return result;
}

