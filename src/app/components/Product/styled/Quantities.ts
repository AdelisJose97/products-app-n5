import styled, { css } from 'styled-components'

export interface IQuantitiesProps {
  fullWidth?: boolean
  secondary?: boolean
}
export const Quantities = styled.div<IQuantitiesProps>`
  --base-color: #0071dc;
  --base-color-hover: #004f9a;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  border-radius: 2rem;
  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  height: 2.5rem;
  gap: 0.25rem;
  padding: 0.25rem;
  background-color: var(--base-color);
  color: #fff;
  border: none;

  ${(props) =>
    props.secondary &&
    css`
      background-color: #fff;
      color: #000;
      border: 1px solid black;
    `}
`
