import React from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

export const LoadingComponent = () => {
  return (
    <>
      <Placeholder
        Animation={Fade}
        Left={PlaceholderMedia}
        Right={PlaceholderMedia}>
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    </>
  );
};
