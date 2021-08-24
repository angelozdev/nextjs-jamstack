import { useCallback } from "react";
import NextImage from "next/image";
import { getHeightAndWidth } from "./utils";
import { formatQueryParams } from "utils";

// types
import type { ImageProps, ImageLoaderProps } from "next/image";
import type { AspectRatio, Fit } from "./types";
interface Props extends Omit<ImageProps, "height"> {
  aspectRatio: AspectRatio;
  fit?: Fit;
  width: number;
  radius?: number;
  format?: "jpg" | "png" | "webp" | "gif";
  fl?: "png8" | "progressive";
}

function Image({
  aspectRatio,
  fit = "fill",
  format,
  radius = 0,
  src,
  width,
  fl,
  ...rest
}: Props) {
  const { height, width: finalWidth } = getHeightAndWidth(width, aspectRatio);

  const loader = useCallback(
    ({ src, width }: ImageLoaderProps): string => {
      const { height, width: finalWidth } = getHeightAndWidth(
        width,
        aspectRatio
      );

      const queries = {
        fit,
        fl,
        fm: format,
        h: height,
        r: radius,
        w: finalWidth,
      };

      const stringParams = formatQueryParams(queries);

      const url = `${src}${stringParams}`;
      return url;
    },
    [aspectRatio, fit, radius, format, fl]
  );

  return (
    <NextImage
      width={finalWidth}
      height={height}
      src={src}
      loader={loader}
      {...rest}
    />
  );
}

export default Image;
