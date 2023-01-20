const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
console.log('testing***********************************', sharedMappings.getDescriptors())

sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "ng12",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
         // library: { type: "module" },
        name: "ng12",
        filename: "remoteEntry.js",
        exposes: {
            './Home': './src/app/home/home.module.ts',
            './HomeComponent': './src/app/home/home.component.ts',
        './web-components': './src/bootstrap.ts',

        },

        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "mfe1@http://localhost:3000/remoteEntry.js",

        // },

        shared: {
          "@angular/core": { requiredVersion:'auto' },
          "@angular/common": { requiredVersion:'auto' },
          "@angular/common/http": { requiredVersion:'auto' },
          "@angular/router": { requiredVersion:'auto' },
          // "@angular/core": { requiredVersion: "12.0.3" },
          // "@angular/common": { requiredVersion: "12.0.3" },
          // "@angular/router": { requiredVersion: "12.0.3" },
          // "rxjs": {},
          // ...sharedMappings.getDescriptors()
        }

    }),
    sharedMappings.getPlugin()
  ],
};
