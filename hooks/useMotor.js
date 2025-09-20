import { useContext } from "react";
import { motorContext } from "../contexts/motorContext";

export function useMotor(){
    const context = useContext(motorContext)

    if(!context){
        throw new Error('Outside the scope of the Motor Provider')
    }

    return context
}