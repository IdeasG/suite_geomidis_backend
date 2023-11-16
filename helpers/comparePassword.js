import bcrypt from "bcryptjs";

export function comparePassword(hashedPassword, password) {
  return bcrypt.compareSync(password, hashedPassword);
}
export function generatePasswordHash(inputString) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(inputString, salt);
  return passwordHash;
}
