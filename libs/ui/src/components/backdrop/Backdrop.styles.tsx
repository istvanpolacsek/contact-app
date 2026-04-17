import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { addTransparency } from '@contact-app/theme';

export const BackdropStyled = styled(motion.div)(
  ({ theme }) => css`
    position: fixed;
    inset: 0;
    background-color: ${addTransparency(theme.palette.colors.black, 40)};
    display: grid;
    place-items: center;
  `,
);
