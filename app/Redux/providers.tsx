"use client";

import { Provider } from "react-redux";
import { ChildrenProps } from '@/types'
import { store } from "./store";

export function Providers({ children }: ChildrenProps) {
    return <Provider store={store}>
        {children}
    </Provider>
}