// Sketch Plugin: AEFlowchart (Settings.js)
// Source: github.com/tadija/AEFlowchart
// Version: 1.1

var Settings = {
  // Keys
  labelFontNameKey: "net.tadija.AEFlowchart.labelFontName",
  labelFontSizeKey: "net.tadija.AEFlowchart.labelFontSize",
  labelFontColorKey: "net.tadija.AEFlowchart.labelFontColor",
  labelDropShadowKey: "net.tadija.AEFlowchart.labelDropShadow",

  startEndColor1Key: "net.tadija.AEFlowchart.startEndColor1",
  startEndColor2Key: "net.tadija.AEFlowchart.startEndColor2",
  processColor1Key: "net.tadija.AEFlowchart.processColor1",
  processColor2Key: "net.tadija.AEFlowchart.processColor2",
  decisionColor1Key: "net.tadija.AEFlowchart.decisionColor1",
  decisionColor2Key: "net.tadija.AEFlowchart.decisionColor2",
  inputOutputColor1Key: "net.tadija.AEFlowchart.inputOutputColor1",
  inputOutputColor2Key: "net.tadija.AEFlowchart.inputOutputColor2",

  // Default Values
  "net.tadija.AEFlowchart.labelFontName": "Andale Mono",
  "net.tadija.AEFlowchart.labelFontSize": 14,
  "net.tadija.AEFlowchart.labelFontColor": "#FFFFFF",
  "net.tadija.AEFlowchart.labelDropShadow": 1,

  "net.tadija.AEFlowchart.startEndColor1": "#FF5B37",
  "net.tadija.AEFlowchart.startEndColor2": "#FB2B69",
  "net.tadija.AEFlowchart.processColor1": "#1AD6FD",
  "net.tadija.AEFlowchart.processColor2": "#1D62F0",
  "net.tadija.AEFlowchart.decisionColor1": "#C644FC",
  "net.tadija.AEFlowchart.decisionColor2": "#5856D6",
  "net.tadija.AEFlowchart.inputOutputColor1": "#B4EC51",
  "net.tadija.AEFlowchart.inputOutputColor2": "#429321"
};

function allSettingKeys() {
  return [Settings.labelFontNameKey, Settings.labelFontSizeKey, Settings.labelFontColorKey, Settings.labelDropShadowKey, Settings.startEndColor1Key, Settings.startEndColor2Key, Settings.processColor1Key, Settings.processColor2Key, Settings.decisionColor1Key, Settings.decisionColor2Key, Settings.inputOutputColor1Key, Settings.inputOutputColor2Key];
}

function readValueForKey(key) {
  var value = [[NSUserDefaults standardUserDefaults] objectForKey:key];
  if (value == null) {
    return Settings[key];
  } else {
    return value;
  }
}

function writeValueForKey(key, value) {
  [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

function restoreDefaultValueForKey(key) {
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
  [[NSUserDefaults standardUserDefaults] synchronize];
}
