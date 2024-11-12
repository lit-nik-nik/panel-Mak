'use client'
import {Toast, ToastContainer} from "react-bootstrap";

export const MyToast = ({message}) => {

    return (
        <ToastContainer
            className="p-3"
            position='bottom-end'
            style={{ zIndex: 1 }}
        >
            <Toast bg='danger'>
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">Ошибка</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}