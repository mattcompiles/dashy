import React, { useState, useEffect } from 'react';
import { Clickable, Icon, Set, Text } from 'bumbag';
import { useRecoilState } from 'recoil';

import { lastFetchState } from './state';

const REFRESH_TIME = 30 * 1000; // 30 seconds

export function Refresh() {
  const [forcedUpdate, forceUpdate] = useState(true);
  const [lastFetch, setLastFetch] = useRecoilState(lastFetchState);

  useEffect(() => {
    const id = setTimeout(() => forceUpdate((v) => !v), 500);

    return () => clearTimeout(id);
  }, [forcedUpdate]);

  useEffect(() => {
    if (lastFetch.getTime() + REFRESH_TIME <= new Date().getTime()) {
      setLastFetch(new Date());
    }
  });

  return (
    <Set>
      <Text>
        {Math.round(
          (lastFetch.getTime() - new Date().getTime() + REFRESH_TIME) / 1000,
        )}
        s
      </Text>
      <Clickable onClick={() => setLastFetch(new Date())} use="button">
        <Icon icon="solid-sync" />
      </Clickable>
    </Set>
  );
}
