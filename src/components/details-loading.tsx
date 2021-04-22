import React from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

export const DetailsLoading = () => {
  return (
    <>
      <Placeholder
        Animation={Fade}
        Left={PlaceholderMedia}
        Right={PlaceholderMedia}>
        <PlaceholderLine width={80} height={30} />
        <PlaceholderLine height={30} />
        <PlaceholderLine width={30} height={30} />
      </Placeholder>
    </>
  );
};
