import { useCountdown } from "@/src/hooks/useCountdown";
import Head from "next/head";

const Home = () => {
  const { days, hours, minutes, seconds } = useCountdown("2023-06-01 13:00:00");

  return (
    <>
      <Head>
        <title>Accueil - LFL-Pickem</title>
        <meta property="og:title" content="Accueil - LFL-Pickem" />
      </Head>
      <div className="w-full max-w-lg mx-auto h-screen flex flex-col items-center md:justify-center">
        <div className="w-full p-4 flex items-end flex-wrap gap-1">
          <h1 className="text-4xl">De retour !</h1>
          <span className="text-sm">Avec un peu de retard...</span>
        </div>
        <div className="w-full  p-4">
          <p>
            LFL Pickem est de retour avec un petit nouveau... la
            <span className="text-[#e8378c] font-bold"> Div2</span>.<br /> Vous
            pourrez désormais prédire les matchs de la LFL ainsi que de la Div2.
            Un nouveau système de points fait son apparition ainsi que le
            classement réunissant tous les joueurs.
            <br />
            <br />
            On se retrouve le jeudi 01 juin pour prédire les vainqueurs de la 2e
            journée de LFL.
          </p>
        </div>
        <div className="w-full mt-20 flex gap-6 justify-center md:gap-10">
          <div className="flex flex-col items-center">
            <span className="text-[#e5e5e5]">
              {days > 0 ? "jours" : "jour"}
            </span>
            <span className="text-4xl">{days}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[#e5e5e5]">
              {hours > 0 ? "heures" : "heure"}
            </span>
            <span className="text-4xl">{hours}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#e5e5e5]">
              {minutes > 0 ? "minutes" : "minute"}
            </span>
            <span className="text-4xl">{minutes}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#e5e5e5]">
              {seconds > 0 ? "secondes" : "seconde"}
            </span>
            <span className="text-4xl">{seconds}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
