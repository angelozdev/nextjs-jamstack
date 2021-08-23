import { useCallback } from "react";
import NextImage from "next/image";
import { getHeightAndWidth } from "./utils";

// types
import type { ImageProps, ImageLoaderProps } from "next/image";
import type { AspectRatio, Fit } from "./types";
interface Props extends Omit<ImageProps, "height"> {
  aspectRatio: AspectRatio;
  fit?: Fit;
  width: number;
  radius?: number;
}

function Image({
  src,
  fit = "scale",
  aspectRatio,
  width,
  radius = 0,
  ...rest
}: Props) {
  const { height, width: finalWidth } = getHeightAndWidth(width, aspectRatio);

  const loader = useCallback(
    ({ src, width }: ImageLoaderProps): string => {
      const { height, width: finalWidth } = getHeightAndWidth(
        width,
        aspectRatio
      );
      const url = `${src}?w=${finalWidth}&h=${height}&fit=${fit}&r=${radius}`;
      return url;
    },
    [aspectRatio, fit, radius]
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
