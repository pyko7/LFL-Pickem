import { useTheme, styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { DrawerProps } from "@/src/types/navigation";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/src/utils/api/auth/logoutUser";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const NavigationDrawer = ({ open, setOpen }: DrawerProps) => {
  const theme = useTheme();
  const { setIsLogged } = useAuthContext();
  const { push } = useRouter();

  const handleClose = () => {
    return setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setIsLogged(false);
      push("/login");
    },
  });

  const handleLogoutButton = () => {
    handleClose();
    mutation.mutate();
  };

  const navLinks = [
    {
      name: "Accueil",
      pathname: "/",
    },
    // {
    //   name: "Classement",
    //   pathname: "/rank",
    // },
    // {
    //   name: "Calendrier",
    //   pathname: "/schedule",
    // },
    {
      name: "Live",
      pathname: "https://www.twitch.tv/otplol_",
    },
    {
      name: "Règles",
      pathname: "/rules",
    },
    {
      name: "Profil",
      pathname: "/profile",
    },
  ];

  const ItemList = styled(List)(({ theme }) => ({
    width: 250,
    padding: 16,
    color: theme.palette.neutral.light,
    "& 	a": {
      marginBottom: 15,
      textDecoration: "none",
      color: "inherit",
      fontWeight: 700,
      fontSize: 18,
      [theme.breakpoints.up("md")]: {
        fontSize: 20,
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: 290,
    },
  }));

  const LogoutButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    left: 16,
    width: "fit-content",
    color: theme.palette.neutral.dark,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: 15,
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 18,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  const ListHeader = styled(Box)({
    width: "100%",
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  });

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={open}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "&	.MuiDrawer-paper": {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      <ListHeader>
        <IconButton sx={{ width: 44, height: 44 }} onClick={handleClose}>
          <CloseIcon
            sx={{ width: 1, height: 1, color: theme.palette.neutral.light }}
          />
        </IconButton>
      </ListHeader>
      <ItemList>
        {navLinks.map((item) => {
          return item.name !== "Live" ? (
            <ListItem key={item.name} disablePadding>
              <Link href={item.pathname} onClick={handleClose}>
                {item.name}
              </Link>
            </ListItem>
          ) : (
            <ListItem key={item.name} disablePadding>
              <a href={item.pathname} target="_blank" rel="noreferrer">
                {item.name} <span style={{ fontSize: 15 }}>(OTP LoL)</span>
              </a>
              <OpenInNewIcon
                sx={{
                  width: 15,
                  height: 15,
                  marginLeft: 0.5,
                  marginBottom: 1,
                }}
              />
            </ListItem>
          );
        })}
      </ItemList>
      <LogoutButton variant="contained" onClick={handleLogoutButton}>
        Se déconnecter
      </LogoutButton>
    </Drawer>
  );
};

export default NavigationDrawer;
