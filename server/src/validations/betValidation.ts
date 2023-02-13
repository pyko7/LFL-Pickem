import * as yup from "yup";

export const betCredentials = yup.object({
  gameId: yup.number().required().positive().integer(),
  dayId: yup.number().required().positive().integer(),
});

export const gameCredentials = yup.object({
  gameId: yup.number().required().positive().integer(),
  teamId: yup.number().required().positive().integer(),
  dayId: yup.number().required().positive().integer(),
});

export const dayCredentials = yup.object({
  dayId: yup.number().required().positive().integer(),
});

export const betGameDate = yup.date();