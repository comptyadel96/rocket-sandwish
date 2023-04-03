module.exports = {
  i18n: {
    locales: ["fr", "ar"],
    defaultLocale: "fr",
    domains: [
      {
        domain: "https://rocket-sandwish-2.vercel.app",
        defaultLocale: "fr",
      },
      {
        domain: "https://rocket-sandwish-2.vercel.app/Login",
        defaultLocale: "fr",
      },
      {
        domain: "https://rocket-sandwish-2.vercel.app/contact",
        defaultLocale: "fr",
        http: true,
      },
    ],
  },
}
