import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { addStylesForBreakpoints } from '@contact-app/theme';

export const ContactListSectionStyled = styled.section(
  () => css`
    display: grid;
    width: 100vw;
    min-height: 100vh;
    grid-template-columns: minmax(0, 1fr) 48rem minmax(0, 1fr);
    grid-template-rows: repeat(2, 6rem) minmax(0, 1fr);
    gap: 1px;

    ${addStylesForBreakpoints(
      css`
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, min-content)) minmax(0, 1fr);
      `,
      'md',
      'sm',
      'xs',
    )}
  `,
);

export const ContactListPageHeaderStyled = styled.div(
  ({ theme }) => css`
    min-height: 6rem;
    padding-inline: 1.5rem;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, min-content);
    align-items: center;
    grid-row-start: 2;
    grid-column-start: 2;
    position: relative;

    &::before,
    &::after {
      position: absolute;
      overflow: hidden;
      content: '';
      height: 1px;
      width: 100vw;
      background-color: ${theme.palette.colors.grey[60]};
    }

    &::before {
      top: 0;
      left: calc(50% - 100vw / 2);
    }

    &::after {
      bottom: 0;
      left: calc(50% - 100vw / 2);
    }

    ${addStylesForBreakpoints(
      css`
        grid-column-start: unset;
        grid-column: span 2;
        grid-template-columns: 1fr;
        row-gap: 0.5rem;
        height: auto;
        padding-block: 1rem;
      `,
      'md',
      'sm',
      'xs',
    )}
  `,
);

export const ContactListUlStyled = styled.ul(
  ({ theme }) => css`
    grid-row-start: 3;
    grid-column-start: 2;
    padding: 0;
    margin: 0;
    display: grid;
    grid-auto-rows: 4rem;
    align-items: center;
    position: relative;
    padding-inline: 1.5rem;
    padding-block: 0.75rem;

    &::before,
    &::after {
      position: absolute;
      overflow: hidden;
      content: '';
      height: calc(100vh - 0.25rem);
      width: 1px;
      background-color: ${theme.palette.colors.grey[60]};
      top: -12rem;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    ${addStylesForBreakpoints(
      css`
        grid-column-start: unset;
        grid-column: span 2;
        grid-auto-rows: unset;
        align-content: start;
        row-gap: 1rem;

        &::before,
        &::after {
          content: unset;
        }
      `,
      'md',
      'sm',
      'xs',
    )}
  `,
);

export const ContactListPageHeaderActionsStyled = styled.div(
  () => css`
    display: flex;
    white-space: nowrap;
    column-gap: 1.5rem;
    align-items: center;

    ${addStylesForBreakpoints(
      css`
        justify-content: space-between;
      `,
      'md',
      'sm',
      'xs',
    )}
  `,
);

export const ContactListPageHeaderSecondaryActionsStyled = styled.div(
  () => css`
    display: flex;
    column-gap: 0.5rem;
  `,
);

type ActionPosition = 'start' | 'center' | 'end';

interface ContactListSectionActionStyledProps {
  $align?: ActionPosition;
  $justify?: ActionPosition;
  $justifyMobile?: ActionPosition;
}

export const ContactListSectionActionStyled = styled.div<ContactListSectionActionStyledProps>(
  ({ $justify = 'center', $align = 'center', $justifyMobile = 'center' }) => css`
    justify-self: ${$justify};
    align-self: ${$align};
    grid-row-start: 2;
    padding-inline: 1.5rem;

    ${addStylesForBreakpoints(
      css`
        grid-row-start: 1;
        padding-block: 0.5rem;
        justify-self: ${$justifyMobile};
      `,
      'md',
      'sm',
      'xs',
    )}
  `,
);
