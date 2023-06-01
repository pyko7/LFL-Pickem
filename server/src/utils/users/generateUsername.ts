import prisma from "../../prisma";

const generateRandomInt = () => {
  return Math.floor(Math.random() * 999) + 1;
};
const findUser = async (userName: string) => {
  return await prisma.user.findUnique({
    where: {
      userName,
    },
  });
};

export const generateUsername = async () => {
  let randomInt = generateRandomInt();
  let userName = `Picker${randomInt}`;

  const userExist = await findUser(userName);

  while (userExist) {
    randomInt = generateRandomInt();
    userName = `Picker${randomInt}`;
  }

  return userName;
};
