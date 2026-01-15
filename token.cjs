// token.cjs
const token = process.env.NPM_TOKEN;
const base64 = Buffer.from(`:${token}`).toString('base64');
console.log(base64);
