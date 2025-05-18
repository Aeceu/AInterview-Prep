// src/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Profile } from "passport";
import { createUser, findUserByEmail } from "./services/user.service";

export default function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: process.env.CALLBACK_URL!,
        scope: ["profile", "email"],
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any,
      ) {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;
          const profilePic = profile.photos?.[0].value;
          if (!email || !name) return;
          let user = await findUserByEmail(email);
          if (!user) {
            user = await createUser({ email, name, profileImage: profilePic });
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
}
