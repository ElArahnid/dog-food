import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = ({props}) => {
  return (
    <ContentLoader 
    speed={2}
    width={260}
    height={500}
    viewBox="0 0 260 500"
    backgroundColor="#f5f5f5"
    foregroundColor="#fbf8e0"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="NaN" height="NaN" /> 
    <rect x="463" y="550" rx="3" ry="3" width="140" height="11" /> 
    <rect x="514" y="598" rx="3" ry="3" width="53" height="11" /> 
    <rect x="574" y="598" rx="3" ry="3" width="72" height="11" /> 
    <rect x="405" y="598" rx="3" ry="3" width="100" height="11" /> 
    <rect x="387" y="621" rx="3" ry="3" width="37" height="11" /> 
    <rect x="405" y="573" rx="3" ry="3" width="140" height="11" /> 
    <rect x="553" y="573" rx="3" ry="3" width="173" height="11" /> 
    <rect x="7" y="362" rx="10" ry="10" width="237" height="49" /> 
    <rect x="7" y="327" rx="10" ry="10" width="85" height="27" /> 
    <rect x="7" y="288" rx="10" ry="10" width="85" height="27" /> 
    <rect x="511" y="477" rx="0" ry="0" width="194" height="248" /> 
    <rect x="572" y="565" rx="0" ry="0" width="37" height="36" /> 
    <circle cx="595" cy="612" r="112" /> 
    <circle cx="587" cy="571" r="20" /> 
    <rect x="7" y="424" rx="10" ry="10" width="162" height="63" /> 
    <rect x="7" y="44" rx="10" ry="10" width="201" height="210" /> 
    <circle cx="223" cy="28" r="23" />
  </ContentLoader>
  )
};
