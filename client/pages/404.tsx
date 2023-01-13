import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Custom404 = () => {
  return (
    <Container
      sx={{
        width: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 6,
        color: "#fff",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 52 }}>
        Oops
      </Typography>
      <Typography sx={{ fontSize: 28 }}>
        Cette page n&apos;existe pas{" "}
      </Typography>

      <Link
        href="/"
        style={{
          width: "100%",
          maxWidth: 275,
          padding: "10px 15px",
          backgroundColor: "#B8933A",
          color: "#000",
          textDecoration: "none",
          borderRadius: 10,
        }}
      >
        Accueil
      </Link>
    </Container>
  );
};

export default Custom404;
