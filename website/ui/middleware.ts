export { default } from "next-auth/middleware"

export const config = { matcher: ["/tests/auth/secure"] }