import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Splash from '../screens/basic/Splash';
import Login from '../screens/authScreens/Login';
import Onboarding1 from '../screens/basic/Onboarding1';
import Onboarding2 from '../screens/basic/Onboarding2';
import Onboarding3 from '../screens/basic/Onboarding3';
import Signup from '../screens/authScreens/Signup';
import ForgotPassword from '../screens/authScreens/ForgotPassword';
import Verification from '../screens/authScreens/Verification';
import NewCredentials from '../screens/authScreens/NewCredentials';
import BottomNav from './BottomNav';
import ProductDetail from '../screens/homeScreens/ProductDetail';
import AllProducts from '../screens/homeScreens/AllProducts';
import VlogsList from '../screens/vlogsScreens/VlogsList';
import DealsItemDetail from '../screens/dealsScreens/DealsItemDetail';
import VlogDetail from '../screens/vlogsScreens/VlogDetail';
import Comments from '../screens/vlogsScreens/Comments';
import Profile from '../screens/accountScreens/Profile';
import Saved from '../screens/accountScreens/Saved';
import MyNotes from '../screens/accountScreens/MyNotes';
import AboutUs from '../screens/accountScreens/AboutUs';
import TermsConditions from '../screens/accountScreens/TermsConditions';
import PrivacyPolicy from '../screens/accountScreens/PrivacyPolicy';
import ProductComment from '../screens/homeScreens/ProductComment';
import DealComment from '../screens/dealsScreens/DealComment';
import ChangePassword from '../screens/accountScreens/ChangePassword';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding1" component={Onboarding1} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding2" component={Onboarding2} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding3" component={Onboarding3} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }}/>
        <Stack.Screen name="NewCredentials" component={NewCredentials} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>

        <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }}/>

        <Stack.Screen name="AllProducts" component={AllProducts} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductComment" component={ProductComment} options={{ headerShown: false }}/>

        <Stack.Screen name="VlogsList" component={VlogsList} options={{ headerShown: false }}/>
        <Stack.Screen name="DealsItemDetail" component={DealsItemDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="DealComment" component={DealComment} options={{ headerShown: false }}/>
        <Stack.Screen name="VlogDetail" component={VlogDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="Comments" component={Comments} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Saved" component={Saved} options={{ headerShown: false }}/>
        <Stack.Screen name="MyNotes" component={MyNotes} options={{ headerShown: false }}/>
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }}/>
        <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ headerShown: false }}/>
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }}/>

      </Stack.Navigator>
   </NavigationContainer>
  );
}