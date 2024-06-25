import styled, { css } from 'styled-components'

interface IButtonProps {
  fullWidth?: boolean
  disabled?: boolean
  hashover?: boolean
}

interface IQuantityButtonProps {
  secondary?: boolean
}

export const Button = styled.button<IButtonProps>`
  --base-color: #0071dc;
  --base-color-hover: #004f9a;

  cursor: ${(props) => (!props.disabled ? 'pointer' : 'auto')};
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 2rem;
  height: 2.5rem;
  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  box-shadow: 0 0.0625rem 0.125rem 0.0625rem #00000026;
  padding: 0.5rem;
  font-size: 16px;
  font-weight: 700;

  background-color: var(--base-color);
  color: #fff;

  &:disabled {
    cursor: auto;
    color: #c5c5c5;
    background-color: #207fd9;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.hashover ? 'var(--base-color-hover)' : 'var(--base-color)'};
  }

  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`

export const QuantityButton = styled(Button)<IQuantityButtonProps>`
  height: 32px;
  width: 32px;
  justify-content: center;
  border-radius: 50%;
  box-shadow: none;
  padding: 0.25rem;
  margin-top: 0;
  &:disabled {
    background-color: var(--base-color);
  }

  ${(props) =>
    props.secondary &&
    css`
      background-color: #fff;
      color: #000000;
      &:hover:not(:disabled) {
        background-color: #74767c;
        color: #fff;
      }
      &:disabled {
        background-color: #fff;
      }
    `}
`
