import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import lflLogo from "~/public/white_lfl.png";
import Image from "next/legacy/image";
import NavigationDrawer from "./NavigationDrawer";

const Header = () => {
  const [open, setOpen] = useState(false);
  const drawerProps = { open, setOpen };

  const ImageContainer = styled("a")(({ theme }) => ({
    width: 65,
    height: 65,
    [theme.breakpoints.up("sm")]: {
      width: 75,
      height: 75,
    },
  }));

  return (
    <>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar
          sx={{
            width: 1,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ImageContainer href="/">
            <Image src={lflLogo} alt="logo" layout="responsive" priority />
          </ImageContainer>
          <IconButton
            sx={{ padding: 0 }}
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon sx={{ width: 38, height: 38 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <NavigationDrawer {...drawerProps} />
      </Box>
    </>
  );
};

export default Header;
