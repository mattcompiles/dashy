import NextApp from 'next/app';
import { Provider as BumbagProvider } from 'bumbag';
import { RecoilRoot } from 'recoil';
import { faCode, faGlobeAsia, faSync } from '@fortawesome/free-solid-svg-icons';

const theme = {
  Icon: {
    iconSets: [
      {
        icons: [faCode, faGlobeAsia, faSync],
        prefix: 'solid-',
        type: 'font-awesome',
      },
    ],
  },
};

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <RecoilRoot>
        <BumbagProvider theme={theme}>
          <Component {...pageProps} />
        </BumbagProvider>
      </RecoilRoot>
    );
  }
}
