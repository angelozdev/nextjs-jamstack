import type { AspectRatio } from "./types";

type AspectRatioToRatio = {
  [aspectRatio in AspectRatio]: number;
};

const MAX_LIMIT_SIZE = 4000;

const aspectRatioToRatio: AspectRatioToRatio = {
  "1:1": 1,
  "16:9": 9 / 16,
  "2:1": 1 / 2,
  "4:3": 3 / 4,
  "9:16": 16 / 9,
  "3:4": 4 / 3,
};

export function getHeight(width: number, aspectRatio: AspectRatio): number {
  const height = Math.floor(aspectRatioToRatio[aspectRatio] * width);
  if (height > MAX_LIMIT_SIZE) return MAX_LIMIT_SIZE;
  return height;
}

export function getHeightAndWidth(
  initialWidth: number,
  aspectRatio: AspectRatio
): { width: number; height: number } {
  const height = getHeight(initialWidth, aspectRatio);

  if (height >= MAX_LIMIT_SIZE) {
    return {
      height: MAX_LIMIT_SIZE,
      width: MAX_LIMIT_SIZE / aspectRatioToRatio[aspectRatio],
    };
  }

  if (initialWidth >= MAX_LIMIT_SIZE) {
    return {
      height: getHeight(MAX_LIMIT_SIZE, aspectRatio),
      width: MAX_LIMIT_SIZE,
    };
  }

  return { width: initialWidth, height };
}
