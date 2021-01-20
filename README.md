
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle


react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

2. Edit schema and select Release
3. Run/Archive like normal ios App

# Windows .apk
cd android && ./gradlew clean && ./gradlew assembleRelease
# Linux .aab
cd android && ./gradlew clean && ./gradlew bundleRelease