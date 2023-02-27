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
      className={`relative team__card w-full 
      ${disabledDay ? "contrast-0 cursor-not-allowed" : ""}
      ${
        visible && !noBet && !disabledDay ? "filter-none hover:filter-none" : ""
      }
      `}
      style={{
        background: firstTeam
          ? `linear-gradient(90deg, rgb(10, 14, 19) 0%, ${team.color} 75%)`
          : `linear-gradient(-90deg, rgb(10, 14, 19) 0%, ${team.color} 75%)`,
      }}
    >
      <h2
        className={`${
          noBet || disabledDay
            ? "animate-none"
            : !visible && firstTeam
            ? "opacity-0 "
            : !visible && !firstTeam
            ? "opacity-0 "
            : visible && firstTeam
            ? "opacity-1 "
            : visible && !firstTeam
            ? "opacity-1 "
            : ""
        }
        team_card_title--opacity
        ${firstTeam ? "mr-5" : "ml-5"}
        max-w-[75px] whitespace-pre-wrap text-sm font-bold sm:text-base`}
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
        className={`absolute top-1/2 ${firstTeam ? "right-3" : "left-3"} 
        ${
          !visible && firstTeam
            ? "animate-centerFirstTeamLogo"
            : !visible && !firstTeam
            ? "animate-centerSecondTeamLogo"
            : visible && firstTeam
            ? "slideLogoToRight"
            : visible && !firstTeam
            ? "animate-slideLogoToLeft"
            : ""
        }
        -translate-y-1/2 w-10 h-10 object-contain sm:w-12 sm:h-12`}
      />
    </button>
  );
};

export default FirstTeam;
