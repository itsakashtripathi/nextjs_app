/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: "mongodb+srv://admin:ReactDB1@cluster0.cvyku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
