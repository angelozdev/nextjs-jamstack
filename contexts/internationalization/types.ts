type TranslateProps = {
  id: string;
  defaultMessage?: string;
};

export type Translate = ({ id, defaultMessage }: TranslateProps) => string;
