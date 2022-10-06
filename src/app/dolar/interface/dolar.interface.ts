export interface Dolar {
    blue: {    
        value_avg: number;
        value_sell: number;
        value_buy: number;
    },
    last_update: string
}

export interface Dolar_Hoy {
    date: string,
    source: string,
    value_sell: number,
    value_buy: number
}