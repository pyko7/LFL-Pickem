type User = {
  username: string;
  points: number;
};

const users: User[] = [
  { username: "user1", points: 10 },
  { username: "user2", points: 20 },
  { username: "user3", points: 15 },
  { username: "user4", points: 5 },
  { username: "user5", points: 30 },
  { username: 'user6', points: 25 },
  { username: 'user7', points: 12 },
  { username: 'user8', points: 18 },
  { username: 'user9', points: 8 },
  { username: 'user10', points: 35 },
  { username: 'user11', points: 42 },
  { username: 'user12', points: 7 },
  { username: 'user13', points: 28 },
  { username: 'user14', points: 14 },
  { username: 'user15', points: 33 },
  { username: 'user16', points: 19 },
  { username: 'user17', points: 24 },
  { username: 'user18', points: 11 },
  { username: 'user19', points: 6 },
  { username: 'user20', points: 31 }
];

const leaderboard = users.sort((a, b) => b.points - a.points);

const Leaderboard = () => {
  return (
    <ul className="w-full mx-auto">
      {leaderboard.map((user, idx) => {
        return (
          <li className="relative w-full h-16 odd:bg-neutral-700 rounded-xl">
            <div className="w-full h-full px-4 flex items-center justify-between font-semibold uppercase md:px-5">
              <span>{idx + 1}</span>
              <span>{user.username}</span>
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
