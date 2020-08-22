import React, { Fragment } from "react";
import HeadSection from "../../components/website/headSection";
import IntroSection from "../../components/website/introSection";
import FeatureSection from "../../components/website/featureSection";
import GetStartedSection from "../../components/website/getStartedSection";
import ProductSection from "../../components/website/productSection";

const Home: React.FC = () => {
  return (
    <Fragment>
      <HeadSection />
      <IntroSection />
      <GetStartedSection />
      <FeatureSection />
      <ProductSection />
    </Fragment>
  );
};

export default Home;
