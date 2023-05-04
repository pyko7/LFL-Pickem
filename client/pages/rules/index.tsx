const Rules = () => {
  const rules = [
    "Prédisez les vainqueurs de chaque journée de LFL.",
    `En cas de bonne prédiction, vous gagnez 3 points. Si vous avez fait le
    mauvais choix, vous ne perdez pas de points mais vous n'en
    gagnez pas non plus.`,
    "Vous avez jusqu'à 18h pour prédire sur les matchs du jour même.",
    `Les journées se déroulant généralement le mercredi soir et le jeudi
    soir. Les résultats sont mis à jour le lendemain des journées à 7h.`,
    "Réaliser un score parfait sur une journée vous octroie un bonus de 5 points",
    "Amusez-vous :)",
  ];

  return (
    <section className="w-full max-w-[1920px] min-h-screen py-9 px-5 text-neutral-light sm:flex sm:flex-col sm:justify-start sm:m-auto">
      <h1 className="text-3xl font-bold text-center">Règles</h1>
      <ul className="w-full pt-9 my-0 mx-auto flex flex-col items-center gap-5 sm:max-w-2xl">
        {rules.map((rule, i) => (
          <li
            className="w-full  py-4 px-6 rounded-lg text-neutral-light bg-neutral-700"
            key={i}
          >
            {rule}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Rules;
