import bcrypt from "bcrypt";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions
} from "passport-jwt";

import User, { IUser } from "../api/user/user.model";

import { find } from "../utils/database/getData";
import { FindDataResult } from "../utils/database/interfaces";

import { JWT_SECRET, JWT_ALGORITHM } from "../../config/initializer";

const OPTS_JWT: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  algorithms: [JWT_ALGORITHM]
};

export default (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        session: false
      },
      (username, password, done) => {
        try {
          find(User, {
            query: { username: username.toLowerCase() },
            populate: { path: "", match: {}, select: "" }
          })
            .then((users: [FindDataResult]) => {
              let [user] = <[IUser]>users;
              if (!user)
                return done(null, false, { message: "Incorrect username" });
              else if (!bcrypt.compareSync(password, user.password))
                return done(null, false, { message: "Incorrect password" });
              else return done(null, user);
            })
            .catch(error => done(error));
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(OPTS_JWT, (payload, done) => {
      try {
        find(User, {
          query: { _id: payload.sub },
          populate: { path: "role", match: {}, select: "name" }
        })
          .then((users: [FindDataResult]) => {
            let [user] = <[IUser]>users;
            if (!user) return done(null, false);
            else return done(null, user);
          })
          .catch(error => done(error));
      } catch (error) {
        return done(error);
      }
    })
  );
};
