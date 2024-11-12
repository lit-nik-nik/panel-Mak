import {Alert, Col, Row} from "react-bootstrap";
import {MessageType} from "@/type/type";

type Props = {
    color: 'success' | 'danger' | 'warning'
    data: MessageType
}

export const Element:React.FC<Props> = ({color, data}) => {

    const renderTime = () => {
        switch(data.Статус) {
            case "Подготовлено":
                return (
                    new Date(data.Времяподготовлено).toLocaleTimeString().slice(0, 5)
                );
            case "К отбору":
                return (
                    new Date(data.Времяподготовлено).toLocaleTimeString().slice(0, 5) + '-' +
                    new Date(data.Времякотбору).toLocaleTimeString().slice(0, 5)
                );
            case "К отгрузке":
                return(
                    new Date(data.Времяподготовлено).toLocaleTimeString().slice(0, 5) + '-' +
                    new Date(data.Времякотбору).toLocaleTimeString().slice(0, 5) + '-' +
                    new Date(data.Времякотгрузке).toLocaleTimeString().slice(0, 5)
                );
        }
    }

    return (
        <Alert variant={color}>
            <Row className='fw-bold fs-5'>
                <Col lg={4} className='text-lg-start text-center'>
                    {data.Номер}
                </Col>
                <Col lg={4} className='fs-6 text-center'>
                    {renderTime()}
                </Col>
                <Col lg={4} className='text-lg-end text-center'>
                    {data.Ответственный}
                </Col>
            </Row>
        </Alert>
    )
}

