module.exports = {
    apps : [
        {
          name: "api-rest-mutants",
          script: "./dist/bin/www.js",
          watch: true, 
          env: {
            NODE_ENV: "development"
          },
          env_qa: {
            NODE_ENV: "test",
          },
          env_production: {
            NODE_ENV: "production",
          }
        }
    ]
  }