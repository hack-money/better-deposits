import React, { Fragment } from 'react';
import HeadSection from '../../components/website/headSection';
import FeatureSection from '../../components/website/featureSection';
import GetStartedSection from '../../components/website/getStartedSection';

export default function Home() {
  return (
    <Fragment>
      <HeadSection />
      <GetStartedSection />
      <FeatureSection />
    </Fragment>
  );
}
