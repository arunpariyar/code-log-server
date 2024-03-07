import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(hashPassword);
}
