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
      className={`team_card
      ${firstTeam ? "justify-end" : ""}
      ${
        disabledDay
          ? "team__card--disabled"
          : noBet || !visible
          ? "team__card--unselected"
          : ""
      }`}
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
        {!visible ? null : (
          <h2 className="text-sm font-bold sm:text-base">{team.name}</h2>
        )}
        <Image
          loader={() => team.logo}
          unoptimized
          src={team.logo}
          alt={team.name}
          width={50}
          height={50}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    </button>
  );
};

export default FirstTeam;
