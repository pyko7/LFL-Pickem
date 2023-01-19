import {
  createUserSchema,
  logUserSchema,
} from "../../../src/validations/userValidation";

describe("Account creation", () => {
  test("invalid character in pseudo", async () => {
    const formValues = {
      pseudo: "$Pseudo",
      email: "email@test.fr",
      password: "Password@123456789",
      confirmPassword: "Password@123456789",
    };
    await expect(createUserSchema.isValid(formValues)).resolves.toBeFalsy();
  });

  test("form values are valid", async () => {
    const formValues = {
      pseudo: "pseudo",
      email: "email@test.fr",
      password: "Password@123456789",
      confirmPassword: "Password@123456789",
    };
    await expect(createUserSchema.isValid(formValues)).resolves.toBeTruthy();
  });

  test("there's no invalid characters but passwords are different", async () => {
    const formValues = {
      pseudo: "pseudo",
      email: "email@test.fr",
      password: "Password@123456789",
      confirmPassword: "123456789@Password",
    };
    await expect(createUserSchema.isValid(formValues)).resolves.toBeFalsy();
  });
});

describe("User log in", () => {
  test("invalid email", async () => {
    const formValues = {
      email: "<fake>email</fake>",
      password: "Password@123456789",
    };
    await expect(logUserSchema.isValid(formValues)).resolves.toBeFalsy();
  });

  test("form values are valid", async () => {
    const formValues = {
      email: "email@test.fr",
      password: "Password?123456789",
    };
    await expect(logUserSchema.isValid(formValues)).resolves.toBeTruthy();
  });
});
