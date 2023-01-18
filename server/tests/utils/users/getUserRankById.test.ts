import { getUserRankById } from "../../../src/utils/users/getUserRankById";
import { UserRank } from "../../../src/types/user";

describe("Get the user's rank with percentile and rank length", () => {
  test("should return the user's rank ", () => {
    const allUsers = [
      {
        id: "aRandomGeneratedId",
        email: "user@email.com",
        userName: "firstuserever",
        points: 0,
      },
      {
        id: "aSecondRandomGeneratedId",
        email: "user2@email.com",
        userName: "seconduser",
        points: 100,
      },
      {
        id: "aThirdRandomGeneratedId",
        email: "user3@email.com",
        userName: "thirduser",
        points: 99,
      },
      {
        id: "aFourthRandomGeneratedId",
        email: "user4@email.com",
        userName: "fourthuser",
        points: 50,
      },
    ];

    const user = {
      id: "aRandomGeneratedId",
      email: "user@email.com",
      userName: "firstuserever",
      points: 0,
    };

    const userRank: UserRank = {
      userRank: 4,
      top: 100,
      ranking: 4,
    };

    expect(getUserRankById(allUsers, user)).toEqual(userRank);
  });
  test("should return the last place of ranking", () => {
    const allUsers = [
      {
        id: "aRandomGeneratedId",
        email: "user@email.com",
        userName: "firstuserever",
        points: 5,
      },
      {
        id: "aSecondRandomGeneratedId",
        email: "user2@email.com",
        userName: "seconduser",
        points: 100,
      },
      {
        id: "aThirdRandomGeneratedId",
        email: "user3@email.com",
        userName: "thirduser",
        points: 99,
      },
      {
        id: "aFourthRandomGeneratedId",
        email: "user4@email.com",
        userName: "fourthuser",
        points: 50,
      },
    ];

    const user = {
      id: "nonexistentInRankingId",
      email: "nonexistentInRanking@email.com",
      userName: "nonexistentInRanking",
      points: 0,
    };

    expect(getUserRankById(allUsers, user)).toEqual(4);
  });
});
