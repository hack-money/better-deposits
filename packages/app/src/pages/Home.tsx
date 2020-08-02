import React, { Fragment } from 'react';
import HeadSection from '../components/headSection';
import FeatureSection from '../components/featureSection';
import GetStartedSection from '../components/getStartedSection';

export default function Home() {
  return (
    <Fragment>
      <HeadSection />
      <GetStartedSection />
      <FeatureSection />
    </Fragment>
  );
}
