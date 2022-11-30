// пример остановки ререндеринга коллбаков с помощью хука useCallback

import { useCallback, useEffect, useState } from "react"
import Logo from "../Logo/Logo";

const AppCallback = () => {
    const [message, setMessage] = useState('Hello World!');
    const [counter, setCounter] = useState(0);


// useCallback сохраняет функцию (первый аргумент, до , []) в ячейке памяти при ререндеринге, что позволяет использовать ее в useEffect в качестве неизменного параметра
    const greeting = useCallback((text) => {
        console.log(text);
    }, []) 

    useEffect(() => {
        greeting(message)
    },[message, greeting])

    return (
        <>
        <Logo onClick={greeting} />
        <button onClick={() => setCounter(counter + 1)}>I AM PUSHED {counter} TIMES</button>
        </>
    )
}

export default AppCallback