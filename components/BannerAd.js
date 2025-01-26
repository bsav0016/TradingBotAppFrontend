import React from "react";
import { Platform, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
const BannerAd = () => {
  const unitID = Platform.select({
    ios: "ca-app-pub-3407478259803394/2116145800",
    android: "ca-app-pub-3407478259803394/2138582137",
  });
 
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AdMobBanner
        adUnitID={unitID}
        bannerSize="smartBanner"
        servePersonalizedAds={false}
        style={{
          padding: 10,
        }}
      />
    </View>
  );
};
 
export default BannerAd;