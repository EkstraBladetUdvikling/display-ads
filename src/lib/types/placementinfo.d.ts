export type TBannerSizes = number[][];

export interface IPlacementInfo {
  allowedFormats: string[];
  sizes: TBannerSizes;
}

export interface ISizesObjet {
  [id: string]: TBannerSizes;
}

export interface IDeviceSizeNames {
  [id: string]: string;
}

export interface IPlacementSizes {
  desktop: IDeviceSizeNames;
  smartphone: IDeviceSizeNames;
  tablet: IDeviceSizeNames;
}
