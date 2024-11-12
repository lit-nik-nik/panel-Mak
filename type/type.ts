
export type Data1C = {
    message: MessageType[]
    QueryTime: number
}

export type MessageType = {
    Номер: string,
    Ответственный: string,
    Статус: 'Подготовлено' | 'К отбору' | 'К отгрузке',
    Времяподготовлено: string,
    Времякотбору: string,
    Времякотгрузке: string
}