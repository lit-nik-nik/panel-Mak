'use server'

import axios from "axios";

export const getOrder1C = async () => {
    let data = {
        data: null,
        error: ''
    }
    await axios.get(process.env.TEST_1C, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.LOGIN_1C}:${process.env.PASS_1C}`).toString('base64')}`
        }
    })
        .then(res => {
            data.data = res.data
        })
        .catch(e => {
            data.error = 'Ошибка соединения с БД'
        })


    return data
}