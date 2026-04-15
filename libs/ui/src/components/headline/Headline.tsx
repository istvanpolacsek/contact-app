import { type FC, type PropsWithChildren } from 'react';
import { HeadlineStyled } from './Headline.styles';

export interface HeadlineProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Headline: FC<PropsWithChildren<HeadlineProps>> = ({
  level = 2,
  children,
}) => <HeadlineStyled as={`h${level}`}>{children}</HeadlineStyled>;

export default Headline;
