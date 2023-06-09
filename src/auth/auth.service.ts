import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'dotenv';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly client: OAuth2Client;
  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
      'http://localhost:3000/api/auth/google/callback',
    ); // Replace CLIENT_ID with your actual Google OAuth 2.0 client ID
  }
  async verifyToken(token: string): Promise<boolean> {
    try {
      console.log('here ===>');
      console.log(this.client);

      // const ticket = await this.client.getTokenInfo(token);
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Replace CLIENT_ID with your actual Google OAuth 2.0 client ID
      });

      console.log('data', ticket);
      // const payload = ticket.getPayload();
      // const userId = payload?.sub; // Retrieve the user ID from the token payload
      // Perform additional validation or custom checks as needed
      return true; // Token is valid
    } catch (error) {
      console.error('Token verification error:', error);
      return false; // Token is invalid
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    console.log(req.user);

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  // async validateAccessToken(accessToken: string): Promise<any> {
  //   try {
  //     console.log('here ==>');
  //     console.log(accessToken);
  //     const response = await axios.get(
  //       `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`,
  //     );
  //     const tokenInfo = response.data;

  //     console.log('response ===>', response);
  //     console.log('tokeninfo ==>', tokenInfo);
  //     return tokenInfo;
  //   } catch (error) {
  //     // Handle any errors that occurred during the API request
  //     throw new Error('Failed to validate access token');
  //   }
  // }
}
