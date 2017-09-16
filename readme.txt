Step to move a current release to a previous release.
1. Check for all the paths in the index html to be relative.
2. Check for the path of the imported modules.
3. Change the baseHref path in Index.html according to the Release version (for e.g for june 2017 demo version BaseHref path will be "/release/jun2017").
4. Build the code using command - npm run build
5. Move the contents from the dist folder to public/release/..releasename folder.

Modes to launch code:
1. Production mode - set ' "ejected": true' in project configuration of angular-cli.json and run command "npm start" in CMD
2. Development mode - set ' "ejected": false ' in project configuration of angular-cli.json and run command "ng serve" in CMD

  