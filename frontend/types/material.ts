export type Seeds = {
    id: number,
    name: string,
    plantId: number,
    url: string,
    description: string,
    price: number
}

export type Fertilizers = {
    id: number,
    name: string,
    form: string,
    url: string,
    npkRatio: string,
    price: number,
    description: string,
}

export type Soils = {
    id: number,
    plantId: number,
    name: string,
    description: string,
    url: string,
    price: number
}