'use client'

import { selectTotal } from "@/app/redux/features/cart/selector";
import { useSelector } from "react-redux";

export const Total = () => {
    const total = useSelector((state) => selectTotal(state));

    return (<span>{total || 0}</span>)
}
