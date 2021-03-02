import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import styles from '../styles/pages/Home.module.css';
import { Countdown } from '../components/Countdown';

import Head from 'next/head';

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>
      <ExperienceBar/>
      <section>
        <div>
          <Profile/>
          <CompletedChallenges/>
          <Countdown/>
        </div>
        <div>
          
        </div>
      </section>
    </div>
  )
}
export default Home;
