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
}

function Image({ src, fit = "scale", aspectRatio, width, ...rest }: Props) {
  const { height, width: finalWidth } = getHeightAndWidth(width, aspectRatio);

  const loader = useCallback(
    ({ src, width }: ImageLoaderProps): string => {
      const { height, width: finalWidth } = getHeightAndWidth(
        width,
        aspectRatio
      );
      const url = `${src}?w=${finalWidth}&h=${height}&fit=${fit}`;
      return url;
    },
    [aspectRatio, fit]
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
