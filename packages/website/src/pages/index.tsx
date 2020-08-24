import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Security</>,
    imageUrl: "img/undraw_Security_on_ff2u.svg",
    description: (
      <>
        No need to worry about whether your landlord has actually protected your
        deposit. You remain in control for all steps of the process.
      </>
    ),
  },
  {
    title: <>Speed</>,
    imageUrl: "img/undraw_transfer_money_rywa.svg",
    description: (
      <>
        Your deposit can be returned to you in seconds if both parties agree.
        &quot;5 business days&quot; is a thing of the past.
      </>
    ),
  },
  {
    title: <>Transparency</>,
    imageUrl: "img/undraw_inspection_9phc.svg",
    description: (
      <>
        No more being kept in the dark. You can always see the exact status of
        your deposit.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Smarter tenancy deposits using the blockchain"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to={"https://app.betterdeposits.com/"}
            >
              Launch App
            </Link>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to={useBaseUrl("docs/")}
            >
              Read More
            </Link>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to={useBaseUrl("questionnaire/")}
            >
              Feedback
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
