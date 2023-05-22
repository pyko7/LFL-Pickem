import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import Button from "../Buttons/Button";

type Props = { handleClose: () => void };

const rules = [
  {
    imageUrl: "/images/bet.webp",
    title: "Prédisez les vainqueurs",
    description:
      "Prédire les vainqueurs de chaque match vous permet de gagner 3 points par match. Si vous choisissez la mauvaise équipe, vous ne gagnez aucun point.",
  },
  {
    imageUrl: "/images/perfect_day.webp",
    title: "Bonus de points",
    description:
      "Réaliser une journée de prédictions parfaite va vous octroyer un bonus de 5 points sur la journée.",
  },
  {
    imageUrl: "/images/leaderboard.webp",
    title: "Classement",
    description:
      "Hissez-vous en haut du classement en gagnant un maximum de points.",
  },
];

const Carousel = ({ handleClose }: Props) => {
  const [active, setActive] = useState(0);

  const handlePreviousClick = () => {
    if (active === 0) {
      return;
    }
    setActive(active - 1);
  };

  const handleNextClick = () => {
    if (active === rules.length - 1) {
      return;
    }
    setActive(active + 1);
  };

  return (
    <div className="w-full">
      {rules.map((rule, i, rules) => {
        return (
          <div key={i}>
            {active === i ? (
              <>
                <div className="relative w-full aspect-video">
                  <Image
                    src={rule.imageUrl}
                    fill
                    className="rounded-xl"
                    alt=""
                  />
                </div>
                <h3 className="mt-10 mb-7 text-xl font-bold">{rule.title}</h3>
                <p>{rule.description}</p>

                <div className="w-full mt-5 flex items-center justify-between">
                  <div className="w-1/3">
                    {active === 0 ? null : (
                      <button
                        aria-label="Diaporama précédente"
                        className="w-7 h-7 cursor-pointer"
                        onClick={handlePreviousClick}
                      >
                        <ChevronLeftIcon
                          className="w-full h-full"
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                  <div className="w-1/3 flex justify-center items-center gap-3">
                    {rules.map((e, idx) => {
                      return (
                        <span
                          className={`block w-2 h-2 ${
                            idx === i ? "bg-lfl" : "bg-neutral-500"
                          } rounded-circle`}
                        />
                      );
                    })}
                  </div>
                  <div className="w-1/3 flex justify-end">
                    {active === rules.length - 1 ? (
                      <Button
                        variant="text"
                        aria-label="Fermer la modale"
                        onClick={handleClose}
                      >
                        J'ai compris
                      </Button>
                    ) : (
                      <button
                        aria-label="Diaporama suivante"
                        className="w-7 h-7 cursor-pointer"
                        onClick={handleNextClick}
                      >
                        <ChevronRightIcon
                          className="w-full h-full"
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
