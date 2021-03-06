import { createContext, ReactNode, useEffect } from 'react';
import { useState } from 'react';
import challenges from '../../challenges.json';


interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level:number,
    experienceToNextLevel:number, 
    currentExperience:number, 
    challengesCompleted:number,
    activeChallenge:Challenge
    levelUp:() => void, 
    startNewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
    
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }:ChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience,setCurrentExperience] = useState(0);
    const [challengesCompleted,setchallengesCompleted] = useState(0);
    const [activeChallenge,setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length + 1);
        const challenge = challenges[randomChallengesIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();
        
        if (Notification.permission == 'granted'){
            new Notification('Novo desafio ',{
                body:`Um novo desafio foi liberado valendo ${challenge.amount} exp`,
                icon:'favicon.png',
                silent:true 
            })
        }
    }

    function resetChallenge () {
        setActiveChallenge(null);
    }

    function completeChallenge () {
        if (!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;
        
        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setchallengesCompleted(challengesCompleted + 1);
    }

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    return (
        <ChallengesContext.Provider 
        value={{ 
            level, 
            currentExperience, 
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            levelUp, 
            startNewChallenge,
            completeChallenge,
            resetChallenge,
            }}
            >
            { children }
        </ChallengesContext.Provider>
    )
}