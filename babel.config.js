module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel", "react-native-reanimated/plugin"]
  };
};

//  "@react-native-community/datetimepicker": "7.2.0",
    // "expo-constants": "~14.4.2",
    // "@types/react-native": "~0.70.6",
    //  "@react-native-community/masked-view": "^0.1.11",


  // "@expo/prebuild-config": "@~6.2.4",
  //   "@expo/config-plugins": "@~7.2.2"