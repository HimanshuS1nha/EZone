export interface ItemProps {
    title: string;
    id: number;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: { rate: number, count: number };
    showSizes?: boolean;
}

export interface ShowCaseProps {
    limit: number;
    category: string;
}

export interface SingleItemProps {
    params: { id: string };
}

export interface CartProps {
    id: number;
    name: string,
    price: number,
    quantity: number,
    category: string;
    image: string;
}

export interface ChildrenProps {
    children: React.ReactNode;
}

export interface SecondStateProps {
    cart: CartProps[]
    totalPrice: number,
    userDetails: Object
}

export interface StateProps {
    cart: SecondStateProps
}

export interface CartComponentProps {
    totalPrice: number;
    cart: CartProps[]
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MiddlewareProps {
    ip: string;
    numberOfRequests: number;
}

export interface PolicyProps {
    title: String;
    content: String[];
}

export interface PolicyComponentProps {
    policy: PolicyProps[],
    title: String;
    description: String;
}

export interface StripeCartProps {
    cart: CartProps[];
    oid: string;
    amount: Number;
}

export interface SearchParamProps {
    searchParams: {
        id: string;
    }
}

export interface OrderProps {
    _id: string;
    oid: number;
    name: String;
    email: string;
    phone: number;
    address: string;
    city: string;
    state: string;
    pincode: number;
    products: CartProps[]
    amount: number;
    paymentStatus: "Pending" | "Paid";
    paymentInfo: Object;
}

export interface ErrorProps {
    error: Error;
    reset: () => void;
}

export interface SessionProps {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
        id?: string | null
    }
    expires: string
}

export interface UserProps {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}