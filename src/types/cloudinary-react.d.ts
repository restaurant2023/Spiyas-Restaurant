// src/types/cloudinary-react.d.ts

declare module 'cloudinary-react' {
  import React from 'react';

  interface CloudinaryContextProps {
    cloudName: string;
    apiKey?: string;
    apiSecret?: string;
    privateCdn?: boolean;
    secure?: boolean;
    [key: string]: any; // For additional props that you might not have covered
  }

  export class CloudinaryContext extends React.Component<CloudinaryContextProps> {}

  interface ImageProps {
    publicId: string;
    format?: string;
    cloudName?: string;
    secure?: boolean;
    width?: number | string;
    height?: number | string;
    crop?: string;
    aspectRatio?: string | number;
    gravity?: string;
    quality?: string | number;
    radius?: string | number;
    angle?: string | number;
    effect?: string;
    opacity?: number;
    border?: string;
    background?: string;
    overlay?: string;
    underlay?: string;
    defaultImage?: string;
    delay?: number;
    color?: string;
    dpr?: string | number;
    responsive?: boolean;
    responsiveUseBreakpoints?: boolean;
    namedTransformation?: string;
    transformation?: Array<TransformationProps>;
    [key: string]: any; // For additional props that you might not have covered
  }

  export class Image extends React.Component<ImageProps> {}
}
