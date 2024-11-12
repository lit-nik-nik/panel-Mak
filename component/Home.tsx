'use client'

import {Col, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {getOrder1C} from "@/api_1c";
import {Data1C} from "@/type/type";
import {Element} from "@/component/Elements";
import {MyToast} from "@/component/MyToast";

const ClassDiv = {
    class: 'border bg-light shadow rounded border-3 p-3 mb-3',
    style: {
        minHeight: '85vh'
    }
}

const Home = () => {
    const intervalID = useRef(null)

    const [data, setData] = useState<Data1C>(null)
    const [timer, setTimer] = useState(30000)
    const [date, setDate] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        getData()

        intervalID.current = setInterval(getData, timer)

        return () => clearInterval(intervalID.current)
    }, [timer])

    useEffect(() => {
        changeTime()
    }, [data])

    useEffect(() => {
        setTimeout(() => setError(''), 3000)
    }, [error])

    const changeTime = () => {
        if (data) {
            setTimer(data.QueryTime * 1000)
        }
    }

    const getData = async () => {
        let data1C:{
            data: Data1C,
            error: string
        }

        data1C = await getOrder1C()

        if (data1C.data) {
            setDate(new Date().toLocaleString())

            setData(data1C.data)
        }
        else if (data1C.error) setError(data1C.error)
    }

    return (
        <Row>
            <Col lg={12} className='border-bottom shadow mb-4 py-3 bg-light'>
                <Row>
                    <Col lg={10} className='text-lg-start text-center text-uppercase ps-lg-5'>
                        <h2>Панель отображения заказов</h2>
                    </Col>
                    <Col>
                        <p className='text-lg-end text-center fs-6 pe-lg-5 m-0'>Время обновления: <br/> {date}</p>
                    </Col>
                </Row>
            </Col>

            <Col lg={4}>
                <div className={`${ClassDiv.class} border-danger`} style={ClassDiv.style}>
                    <h2 className='text-center text-danger text-uppercase'>
                        На сборку
                        ({data?.message.filter(a => a.Статус === 'Подготовлено').length} шт.)
                    </h2>

                    <hr className='text-danger'/>

                    {data ? data?.message.filter(a => a.Статус === 'Подготовлено').map(item =>
                        <Element key={item.Номер} color='danger' data={item} />
                    ) : <></>}
                </div>
            </Col>
            <Col lg={4}>
                <div className={`${ClassDiv.class} border-warning`} style={ClassDiv.style}>
                    <h2 className='text-center text-warning text-uppercase'>
                        В работе
                        ({data?.message.filter(a => a.Статус === 'К отбору').length} шт.)
                    </h2>

                    <hr className='text-warning'/>

                    {data ? data?.message.filter(a => a.Статус === 'К отбору').map(item =>
                        <Element key={item.Номер} color='warning' data={item} />
                    ) : <></>}
                </div>
            </Col>
            <Col lg={4}>
                <div className={`${ClassDiv.class} border-success`} style={ClassDiv.style}>
                    <h2 className='text-center text-success text-uppercase'>
                        К отгрузке
                        ({data?.message.filter(a => a.Статус === 'К отгрузке').length} шт.)
                    </h2>

                    <hr className='text-success'/>

                    {data ? data?.message.filter(a => a.Статус === 'К отгрузке').map(item =>
                        <Element key={item.Номер} color='success' data={item} />
                    ) : <></>}
                </div>
            </Col>

            {error && <MyToast message={error} />}
        </Row>
    );
}

export default Home