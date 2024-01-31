import { test, expect, describe } from "vitest"
import url from "../../../url";
import axios from "axios";

var id = 0
describe("User Service", async () => {
    test("Deve ser possível criar um usuário", async () => {
        const body = {
            name: "teste",
            email: "teste@gmail.com",
            age: 200,
            city: "Pedregulho",
            total: 35,
            streak: 10,
            created_date: "2024-01-26T17:54:00.303Z",
        }
        const result = await axios.post(url.handleUrl() + "user", body);
        expect(result.status).toBe(200);

    })


    test("Deve ser possível puxar um usuário", async () => {
        const result = await axios.get(url.handleUrl() + "user/teste@gmail.com");
        expect(result.status).toBe(200);
        id = result.data.id;
    })


    test("Dever ser possivél editar um usuário", async () => {
        const body = {
            id:id,
            name: "teste2",
            age: 2000,
            city: "Pedregulhoa",
            total: 353,
            streak: 105,
        }

        const result = await axios.put(url.handleUrl() + "user", body);
        expect(result.status).toBe(200);
    })


    test("Deve ser possível deletar um usuário", async () => {
        const result = await axios.delete(url.handleUrl() + "user/teste@gmail.com");
        expect(result.status).toBe(200);
    })


    test("Dever ser possivél retornar os 8 usuários com mais sequencia de rezas", async () => {
        const result = await axios.get(url.handleUrl() + "user/topStreak/0/8");
        expect(result.status).toBe(200);
    })


    test("Dever ser possivél retornar os 8 usuários com mais rezas totais", async () => {
        const result = await axios.get(url.handleUrl() + "user/topTotal/0/8");
        expect(result.status).toBe(200);
    })
})



