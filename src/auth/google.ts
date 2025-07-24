import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../config/config';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Here, handle saving or finding the user in your DB
        const userData = {
          name: profile.displayName,
          email: profile.emails?.[0].value,
          picture: profile.photos?.[0].value,
        };

        // TODO: Check DB for existing user or create one
        // For now, just return the user data
        return done(null, userData);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user (for session support)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
