import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
    minutes:number,
    secounds:number,
    hasFinished:boolean,
    isActive:boolean,
    startCountDown:()=> void,
    resetCountDown:()=> void,
}

interface CountdownProviderProps {
    children: ReactNode
}




export const CountdownContext = createContext({} as CountdownContextData )

export function CountdownProvider({children}:CountdownProviderProps){

    let countDownTimeout: NodeJS.Timeout;
    let timeDefault: number = 0.1 * 60;

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(timeDefault);
    const [isActive, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const secounds = time % 60;


    function startCountDown() {
        setActive(true);
    }

    function resetCountDown() {
        setActive(false);
        clearTimeout(countDownTimeout);
        setTime(timeDefault);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0){
            setHasFinished(true);
            setActive(false);
            startNewChallenge();
        }
    }, [isActive, time])



    return (
        <CountdownContext.Provider value={{
            minutes,
            secounds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,

        }}>
            {children}
        </CountdownContext.Provider>
    )
}