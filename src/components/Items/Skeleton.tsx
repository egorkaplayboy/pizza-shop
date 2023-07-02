import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={310}
    height={460}
    viewBox="0 0 310 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="302" rx="10" ry="10" width="300" height="24" />
    <rect x="0" y="338" rx="10" ry="10" width="300" height="55" />
    <rect x="150" y="403" rx="30" ry="30" width="150" height="44" />
    <circle cx="145" cy="134" r="125" />
    <rect x="26" y="412" rx="10" ry="10" width="90" height="30" />
  </ContentLoader>
);

export default Skeleton;
