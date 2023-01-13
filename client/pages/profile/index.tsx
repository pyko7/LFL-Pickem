import Head from "next/head";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendEmailForm from "~/src/components/Forms/SendEmailForm";
import ConfirmDelete from "~/src/components/Forms/ConfirmDelete";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User, UserRank } from "~/src/types/user";
import { getUserById } from "~/src/utils/api/user/getUserById";
import { getLoginCsrfToken } from "~/src/utils/api/auth/getLoginCsrfToken";
import { getUserRank } from "~/src/utils/api/user/getUserRank";

const Profile = () => {
  const theme = useTheme();
  const [resetPassword, setResetPassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const csrfToken = useQuery(["token"], getLoginCsrfToken);

  const currentUser: UseQueryResult<User> = useQuery(["user"], getUserById, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  const userRank: UseQueryResult<UserRank> = useQuery(["rank"], getUserRank, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  const resetPasswordProps = {
    open: resetPassword,
    setOpen: setResetPassword,
    url: "user/reset-password",
    title: "Réinitialisation du mot de passe",
    buttonName: "réinitialiser le mot de passe",
  };

  const deleteAccountProps = { deleteAccount, setDeleteAccount };

  const handlePasswordClick = () => {
    return resetPassword ? setResetPassword(false) : setResetPassword(true);
  };

  const handleDeleteAccountClick = () => {
    return deleteAccount ? setDeleteAccount(false) : setDeleteAccount(true);
  };

  const Page = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "32px 0 15px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50,
    },
  }));

  const ProfileHeader = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.neutral.light,
  }));

  const UserName = styled(Typography)({
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
    borderRadius: "8px 8px 0 0",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 395,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 445,
    },
  });

  const PointsCounter = styled(Typography)(({ theme }) => ({
    padding: "3px 7px",
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textTransform: "uppercase",
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 8,
  }));

  const SectionDivider = styled(Divider)(({ theme }) => ({
    width: "66%",
    maxWidth: 650,
    margin: "25px auto",
    backgroundColor: theme.palette.primary.light,
  }));

  const ProfileList = styled(List)(({ theme }) => ({
    padding: 0,
    color: theme.palette.neutral.light,
  }));

  const ListIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: 0,
    marginRight: 10,
    padding: 2,
    border: `2px solid ${theme.palette.neutral.light}`,
    borderRadius: 8,
    color: theme.palette.neutral.light,
  }));

  return (
    <>
      <Head>
        <title>Profil - LFL-Pickem</title>
        <meta property="og:title" content="Profil - LFL-Pickem" />
      </Head>

      <Page component="section">
        {csrfToken.isError ? (
          <Typography>
            Une erreur est survenue, veuillez réessayer plus tard.
          </Typography>
        ) : (
          <>
            <Container maxWidth="md">
              <ProfileHeader>
                {currentUser.isLoading || csrfToken.isLoading ? (
                  <>
                    <Skeleton variant="text" width={120} height={30} />
                    <Skeleton variant="rounded" width={70} height={30} />
                  </>
                ) : currentUser.isError ? (
                  <>
                    <UserName>User</UserName>
                    <PointsCounter>N/A pts </PointsCounter>
                  </>
                ) : (
                  <>
                    <UserName>{currentUser.data.userName}</UserName>
                    <PointsCounter>{currentUser.data.points} pts</PointsCounter>
                  </>
                )}
              </ProfileHeader>
              <SectionDivider />

              <ProfileList>
                <ListItem disableGutters>
                  {userRank.isLoading ? (
                    <Skeleton variant="rounded" width={200} height={30} />
                  ) : userRank.isError ? (
                    <ListItemText primary={`Classement actuel: N/A`} />
                  ) : (
                    <ListItemText
                      primary={`Classement actuel: ${userRank.data.userRank}`}
                    />
                  )}
                </ListItem>
                <ListItem disableGutters>
                  {userRank.isLoading ? (
                    <Skeleton variant="rounded" width={100} height={30} />
                  ) : userRank.isError ? (
                    <ListItemText primary={`Top: N/A`} />
                  ) : (
                    <ListItemText primary={`Top: ${userRank.data.top}%`} />
                  )}
                </ListItem>
              </ProfileList>
              <SectionDivider />

              <ProfileList>
                <ListItem disableGutters sx={{ width: "fit-content" }}>
                  <ListItemButton disableGutters onClick={handlePasswordClick}>
                    <ListIcon>
                      <EditIcon />
                    </ListIcon>
                    <ListItemText primary="Modifier le mot de passe" />
                  </ListItemButton>
                </ListItem>
                <ListItem disableGutters sx={{ width: "fit-content" }}>
                  <ListItemButton
                    disableGutters
                    onClick={handleDeleteAccountClick}
                  >
                    <ListIcon>
                      <DeleteIcon />
                    </ListIcon>
                    <ListItemText primary="Supprimer le compte" />
                  </ListItemButton>
                </ListItem>
              </ProfileList>
            </Container>
            <SendEmailForm {...resetPasswordProps} />
            <ConfirmDelete {...deleteAccountProps} />
          </>
        )}
      </Page>
    </>
  );
};

export default Profile;
