import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Backtest from './components/backtest';
import Home from './components/home';
import Auth from './components/auth';
import Profile from './components/profile';
import About from './components/about';
import Bot from './components/bot'
import BacktestResults from './components/backtestResults';
import Instructions from './components/instructions';
import HowItWorks from './components/instructions/howItWorks';
import BotInstructions from './components/instructions/botInstructions';
import BacktestInstructions from './components/instructions/backtestInstructions';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Auth: {screen: Auth},
  Home: {screen: Home},
  Backtest: {screen: Backtest},
  Profile: {screen: Profile},
  About: {screen: About},
  Bot: {screen: Bot},
  BacktestResults: {screen: BacktestResults},
  Instructions: {screen: Instructions},
  HowItWorks: {screen: HowItWorks},
  BotInstructions: {screen: BotInstructions},
  BacktestInstructions: {screen: BacktestInstructions}
})

const App = createAppContainer(AppNavigator)

export default App;