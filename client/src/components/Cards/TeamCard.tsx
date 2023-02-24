import { useState, useEffect } from "react";
import { TeamProps } from "@/src/types/teams";
import Image from "next/image";

const FirstTeam = ({
  team,
  notSelected,
  disabledDay,
  noBet,
  firstTeam,
}: TeamProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (notSelected === team.id) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [notSelected, team.id]);

  return (
    <button
      type="button"
      name={team.name}
      className={`team__card
      ${firstTeam ? "justify-end" : ""}
      ${disabledDay ? "contrast-0 cursor-not-allowed" : ""}
      ${visible && !noBet ? "filter-none hover:filter-none" : ""}
      `}
      style={{
        background: firstTeam
          ? `linear-gradient(90deg, rgb(10, 14, 19) 0%, ${team.color} 75%)`
          : `linear-gradient(-90deg, rgb(10, 14, 19) 0%, ${team.color} 75%)`,
      }}
    >
      <div
        className={`w-full py-5 flex ${
          !firstTeam ? "flex-row-reverse" : ""
        } items-center justify-center gap-3
        ${visible ? "sm:w-2/3 sm:justify-between" : "sm:justify-center"}
       `}
      >
        <h2
          className={`${
            !visible && firstTeam
              ? "animate-hideFirstTeamName"
              : !visible && !firstTeam
              ? "animate-hideSecondTeamName"
              : visible && firstTeam
              ? "animate-showFirstTeamName"
              : visible && !firstTeam
              ? "animate-showSecondTeamName"
              : ""
          } text-sm font-bold sm:text-base`}
        >
          {team.name}
        </h2>

        <Image
          loader={() => team.logo}
          unoptimized
          src={team.logo}
          alt={team.name}
          width={50}
          height={50}
          className="w-10 h-10 object-contain sm:w-12 sm:h-12"
        />
      </div>
    </button>
  );
};

export default FirstTeam;
