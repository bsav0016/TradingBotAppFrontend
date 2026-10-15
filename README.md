# Trading Bot App (frontend)

Mobile app for back-testing and running indicator-based crypto trading strategies. You pick a coin, a time range and up to three technical indicators, and the app sends the request to a separate backend API and shows how the strategy would have performed.

This is an early Expo prototype and the repository is archived. It belongs with the AlgoTracker project ([frontend](https://github.com/bsav0016/AlgoTrackerFrontend), [backend](https://github.com/bsav0016/AlgoTrackerBackend)); look there for the maintained version. The backend this app talks to is not part of this repository.

## What it does

- **Backtest** – choose a coin, backtest period, candle length and starting investment, then configure up to three indicators (RSI, MACD, ADX, EMA, Bollinger Bands) with buy/sell conditions, plus optional stop-loss and take-profit. The app validates the inputs, sends the request, and shows the bot's percent return.
- **Run Bot** – the same setup, submitted as a bot request instead of a historical test.
- **Instructions** – in-app explanations of each parameter and of how the indicators work, with links to reference articles.
- **Account** – sign up, log in and manage your profile. The auth token is kept in AsyncStorage.

## Stack

- React Native 0.71 / Expo SDK 48 (JavaScript)
- `react-navigation` v4 stack navigator
- `react-native-paper`, `react-native-dropdown-picker` and FontAwesome icons for the UI

## Running it

```bash
npm install
npm start            # expo start
npm run android      # or npm run ios / npm run web
```

The API address is hard-coded as `http://192.168.1.230:8000` in `components/auth.js`, `backtest.js`, `backtestResults.js` and `bot.js`. Change it to wherever your backend runs, or the network calls will fail. There are no tests.

## License

[MIT](LICENSE)
