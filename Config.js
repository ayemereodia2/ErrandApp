import * as Updates from 'expo-updates';

let Config = {
  apiUrl: 'https://errand-app.herokuapp.com/v1',
  enableHiddenFeatures: true,
};

if (Updates.channel === 'production') {
  Config.apiUrl = 'https://apis.swave.ng/v1/';
  Config.enableHiddenFeatures = false;
} else if (Updates.channel === 'staging') {
  Config.apiUrl = 'https://errand-app.herokuapp.com/v1';
  Config.enableHiddenFeatures = true;
}

export default Config;