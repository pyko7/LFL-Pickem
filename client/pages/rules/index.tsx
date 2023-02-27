const Rules = () => {
  return (
    <section className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[1920px] py-9 px-5 text-neutral-light bg-main">
      <h1 className="text-3xl font-bold text-center">Règles</h1>
      <ul className="w-full pt-9 my-0 mx-auto flex flex-col items-center gap-5 md:w-1/2">
        <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          Prédisez les vainqueurs de chaque journée de LFL.
        </li>
        <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          En cas de bonne prédiction, vous gagnez 5 points. Si vous avez fait le
          mauvais choix, vous ne perdez pas de points mais vous n&lsquo;en
          gagnez pas non plus.
        </li>
        <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          Vous avez jusqu&lsquo;à 18h pour prédire sur les matchs du jour même.
        </li>
        <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          Les journées se déroulant généralement le mercredi soir et le jeudi
          soir. Les résultats sont mis à jour le lendemain des journées à 7h.
        </li>
        {/* <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          Réaliser un score parfait sur une journée vous octroie un bonus de 3 points
        </li> */}
        {/* <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          Vous pouvez rejoindre le&nbsp;
          <a
            href="https://discord.gg/g3M24pdShN"
            style={{ fontWeight: "bold", color: "inherit" }}
            target="_blank"
            rel="noreferrer"
          >
            discord
          </a>
          &nbsp; afin de partager vos résultats et prédictions.
        </li>
        <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          En cas de problème, un salon dedié existe sur le&nbsp;
          <a
            href="https://discord.gg/g3M24pdShN"
            style={{ fontWeight: "bold", color: "inherit" }}
            target="_blank"
            rel="noreferrer"
          >
            discord
          </a>
          .
        </li> */}
        <li className="w-full  py-4 px-6 rounded-md text-neutral-light bg-main-light hover:brightness-[1.1]">
          Amusez-vous :{")"}
        </li>
      </ul>
    </section>
  );
};

export default Rules;
