import { test, expect, describe } from "vitest"
import url from "../../../url";
import axios from "axios";

var id = 0
describe("User Service", async () => {
    test("Deve ser possível criar uma reza", async () => {
        const body = {
            id_user: 3,
            date: "2024-01-26T17:54:00.303Z"
        }
        const result = await axios.post(url.handleUrl() + "pray", body);
        expect(result.status).toBe(200);
        id = result.data.id;
    })


    test("Deve ser possível deletar uma reza", async () => {
        const result = await axios.delete(url.handleUrl() + `pray/${id}`);
        expect(result.status).toBe(200);
    })
})



