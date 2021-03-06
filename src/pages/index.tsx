import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

function Home(props:HomeProps) {

  return (
    <ChallengesProvider 
    level = {props.level}
    currentExperience = {props.currentExperience}
    challengesCompleted = {props.challengesCompleted}
    >

      <div className={styles.container}>
        <Head>
          <title> Inicio | move.it</title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>

          <section>

            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
            
          </section>

        </CountdownProvider>
      </div>

    </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) =>{

  const { level , currentExperience , challengesCompleted } = ctx.req.cookies;


  return ( 
      {
        props:{
          level: level ? Number(level) : null ,
          currentExperience: currentExperience ? Number(currentExperience) : null,
          challengesCompleted: challengesCompleted ? Number(challengesCompleted) : null
        }
      }
  )
}

export default Home;
