import { useTheme, styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { DrawerProps } from "~/src/types/navigation";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

const NavigationDrawer = ({ open, setOpen }: DrawerProps) => {
  const theme = useTheme();
  const handleClose = () => {
    return setOpen(false);
  };

  const navLinks = [
    {
      name: "Accueil",
      pathname: "/",
    },
    {
      name: "Classement",
      pathname: "/rank",
    },
    {
      name: "Calendrier",
      pathname: "/schedule",
    },
    {
      name: "Live",
      pathname: "https://www.twitch.tv/otplol_",
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
              <Link href={item.pathname} onClick={handleClose}>{item.name}</Link>
            </ListItem>
          ) : (
            <ListItem key={item.name} disablePadding>
              <a href={item.pathname} target="_blank">
                {item.name}
              </a>
            </ListItem>
          );
        })}
      </ItemList>
    </Drawer>
  );
};

export default NavigationDrawer;

//END DRAWER + ADD LINKS + RESPONSIVE
//PROFILE PAGE WITH INFORMATIONS