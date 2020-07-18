import React, { Fragment } from 'react';
import HeadSection from '../components/headSection';
import FeatureSection from '../components/featureSection';
import HowWorksSection from '../components/howWorksSection';

export default function Home() {
  return (
    <Fragment>
      <HeadSection />
      <HowWorksSection />
      <FeatureSection />
    </Fragment>
  );
}
