import NextApp from 'next/app';
import { Provider as BumbagProvider } from 'bumbag';
import { RecoilRoot } from 'recoil';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <RecoilRoot>
        <BumbagProvider>
          <Component {...pageProps} />
        </BumbagProvider>
      </RecoilRoot>
    );
  }
}
