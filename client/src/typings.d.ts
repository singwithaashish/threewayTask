export type User = {
    name: string;
    isManufacturer: Boolean;
    email: string;
    _id: string | null;
    address: string;
}

export type Order = {
    _id: string;
    from: string; // address
    to: string; // address
    quantity: number;
    pickup: string; // userid
    transporter: string; // userid
    status: string; // enum
    price: number | null;
    createdAt: Date;
    manufacturerId: string;
    transporterId: string;
}

export type Message = {
    _id?: string;
    from: string; // userid
    to: string; // userid
    content: string;
    // createdAt: Date;
}