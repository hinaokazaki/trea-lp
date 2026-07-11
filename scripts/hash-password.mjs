// 使い方: node scripts/hash-password.mjs "パスワード"
// 出力された文字列を .env の ADMIN_PASSWORD_HASH に設定してください。
import { scryptSync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('使い方: node scripts/hash-password.mjs "パスワード"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`scrypt:${salt.toString("base64")}:${hash.toString("base64")}`);
