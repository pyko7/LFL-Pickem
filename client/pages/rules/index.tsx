import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

const Rules = () => {
  const Page = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "15%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 1920,
    padding: "35px 20px",
    color: theme.palette.neutral.light,
    backgroundColor: theme.palette.primary.main,
  }));

  const Title = styled(Typography)({
    fontSize: 32,
    fontWeight: 700,
    textAlign: "center",
  });

  const TextContainer = styled(List)(({ theme }) => ({
    width: "50%",
    paddingTop: 35,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }));

  const Rule = styled(ListItem)(({ theme }) => ({
    width: "100%",
    heigth: 60,
    padding: "15px 25px ",
    borderRadius: 4,
    color: theme.palette.neutral.light,
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      filter: "brightness(1.1)",
    },
  }));

  return (
    <Page>
      <Title>Règles</Title>
      <TextContainer>
        <Rule>Prédisez les vainqueurs de chaque journée de LFL.</Rule>
        <Rule>
          En cas de bonne prédiction, vous gagnez 5 points. Si vous avez fait le
          mauvais choix, vous ne perdez pas de points mais vous n&lsquo;en
          gagnez pas non plus.
        </Rule>
        <Rule>
          Vous avez jusqu&lsquo;à 18h pour prédire sur les matchs du jour même.
        </Rule>
        <Rule>
          Les journées se déroulant généralement le mercredi soir et le jeudi
          soir. Les résultats sont mis à jour le lendemain des journées à 7h.
        </Rule>
        {/* <Rule>
          Réaliser un score parfait sur une journée vous octroie un bonus de 3 points
        </Rule> */}
        {/* <Rule>
          Vous pouvez rejoindre le&nbsp;
          <a
            href="https://discord.gg/g3M24pdShN"
            style={{ fontWeight: "bold", color: "inherit" }}
            target="_blank"
            rel="noreferrer"
          >
            discord
          </a>
          &nbsp; afin de partager vos résultats et prédictions.
        </Rule>
        <Rule>
          En cas de problème, un salon dedié existe sur le&nbsp;
          <a
            href="https://discord.gg/g3M24pdShN"
            style={{ fontWeight: "bold", color: "inherit" }}
            target="_blank"
            rel="noreferrer"
          >
            discord
          </a>
          .
        </Rule> */}
        <Rule>Amusez-vous :{")"}</Rule>
      </TextContainer>
    </Page>
  );
};

export default Rules;
