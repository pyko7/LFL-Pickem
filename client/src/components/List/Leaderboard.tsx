import { User, UserLeaderboard } from "@/src/types/types";

type Props = {
  currentUser?: User;
  leaderboard: UserLeaderboard[];
};

const Leaderboard = ({ currentUser, leaderboard }: Props) => {
  return (
    <ul className="w-full mx-auto">
      {leaderboard.map((user, idx) => {
        return (
          <li
            className="relative w-full h-16 odd:bg-neutral-700 rounded-xl"
            key={user.id}
          >
            <div
              className={`w-full h-full px-4 flex items-center justify-between ${
                user.id === currentUser?.id ? "text-lfl" : ""
              } font-semibold uppercase md:px-5`}
            >
              <span>{idx + 1}</span>
              <span>{user.userName}</span>
              <div className="flex flex-col items-center justify-center text-sm z-10">
                <span>{user.points}</span>
                <span>pts</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Leaderboard;
