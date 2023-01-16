import Link from "next/link";

const Custom404 = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 6,
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: 52 }}>Oops</h1>
      <p style={{ fontSize: 28 }}>Cette page n&apos;existe pas </p>

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
    </div>
  );
};

export default Custom404;
