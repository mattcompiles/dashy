import './_app.css';

import NextApp from 'next/app';
import { Provider as BumbagProvider } from 'bumbag';
import { RecoilRoot } from 'recoil';
import {
  faCode,
  faGlobeAsia,
  faSync,
  faComment,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const theme = {
  Icon: {
    iconSets: [
      {
        icons: [faCode, faGlobeAsia, faSync, faComment, faCog],
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
