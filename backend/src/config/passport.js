import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config({ path: "./config.env" });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          const randomPassword = await bcrypt.hash(profile.id, 10);

          user = await User.create({
            name: profile.displayName,
            email,
            password: randomPassword,
            googleId: profile.id,
            authProvider: "google",
            profileImage: profile.photos?.[0]?.value || "",
            isVerified: true,
          });
        } else {
          user.googleId = profile.id;
          user.authProvider = "google";

          if (!user.profileImage) {
            user.profileImage = profile.photos?.[0]?.value || "";
          }

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.log("Google Strategy Error:", error);
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
