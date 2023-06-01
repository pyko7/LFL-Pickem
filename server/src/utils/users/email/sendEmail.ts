const SibApiV3Sdk = require("sib-api-v3-sdk");
import * as dotenv from "dotenv";
dotenv.config();

/**
 * 
 * @param subject Title & text content of email
 * @param email Email of user
 * @param verificationLink Firebase link sent to user
 * @param htmlContent Template of email
 * @returns 
 */
export const sendEmail = async (
  subject: string,
  email: string,
  verificationLink: string,
  htmlContent: string
) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sender = {
    email: process.env.CONTACTEMAIL,
    name: "LFL Pickem",
  };
  const receiver = [{ email }];

  const sendSmtpEmail = {
    sender,
    to: receiver,
    subject: `${subject} - LFL Pickem`,
    textContent: ` ${subject} ${verificationLink}`,
    htmlContent,
  };

  try {
    return await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    return error;
  }
};
