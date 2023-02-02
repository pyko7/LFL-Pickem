import * as yup from "yup";

export const createUserSchema = yup.object({
  pseudo: yup
    .string()
    .min(2, "Veuillez entrer au minimum 2 caractères")
    .max(16, "Veuillez entrer maximum 16 caractères")
    .lowercase()
    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,16}$/g, {
      message: "Seuls les caractères spéciaux . et _ sont acceptés ",
      excludeEmptyString: true,
    })
    .required("Veuillez remplir ce champ"),
  email: yup
    .string()
    .email("Veuillez entrer une adresse email valide")
    .required("Veuillez remplir ce champ"),
  password: yup
    .string()
    .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g, {
      message:
        "Le mot de passe doit contenir au minimum 8 caractères, une majuscule, une minuscule, un chiffre ainsi qu'un caractère spécial ",
      excludeEmptyString: true,
    })
    .required("Veuillez remplir ce champ"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent être similaires"
    )
    .required("Veuillez remplir ce champ"),
});

export const logUserSchema = yup.object({
  email: yup
    .string()
    .email("Adresse email et/ou mot de passe incorrect")
    .required("Adresse email et/ou mot de passe incorrect"),
  password: yup
    .string()
    .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g, {
      message: "Adresse email et/ou mot de passe incorrect",
      excludeEmptyString: true,
    })
    .required("Adresse email et/ou mot de passe incorrect"),
});

export const userCredentials = yup.object({
  email: yup
    .string()
    .email("Adresse email et/ou mot de passe incorrect")
    .required("Adresse email et/ou mot de passe incorrect"),
});
