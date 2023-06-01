export const genererateResetPasswordEmailTemplate = (
  verificationLink: string
) => {
  return `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    
    <style>
      div{
        font-family: 'Roboto', sans-serif;
      }
    .intro{
      display:block;
    }
    
    .button{
      width:fit-content;
      padding: 10px 15px;
      border-radius: 5px;
      color:white;
      font-weight:bold;
      background-color: #B8933A;
      text-decoration: none;
      box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .button:hover{
      background-color: #C5A047;
    }
    
    .links{
      width:100%;
      margin:50px 0;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:25px;
      }
      .anchor{
    width:100%;
        display:flex;
      flex-direction:column;
      align-items:center;
      gap:10px;
      
    }
      
    </style>
    
    <div>
      <h1>Réinitialisation du mot de passe</h1>
      <p class="intro">Vous avez fait une demande de réinitialisation de mot passe. Cliquez sur le bouton pour réinitialiser le mot de passe:</p>
      <div class="links">
        <a href="${verificationLink}" class="button">Réinitialiser le mot de passe</a>
        <div class="anchor">
          <span>ou utiliser le lien ci-dessous:</span>
          <a href=${verificationLink}>${verificationLink}</a>
        </div>
        <div class="anchor">
          <h2>Besoin d'aide ?</h2>
          <span style="text-align:center;display:block; margin:0 auto;">Envoyer un email à
            <a href='mailto:${process.env.CONTACTEMAIL}'>${process.env.CONTACTEMAIL}</a>
          </span>
        </div>
      </div>
    </div>`;
};
