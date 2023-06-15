import { memo, useMemo } from "react";
import styled from "styled-components";

type ChildType = {
  value?: number;
  obj?: { a: number };
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Child: React.FC<ChildType> = (props) => {
  console.log(`子组件${props.value}`);

  return <Wrapper>子组件{props.value}</Wrapper>;
};

export default memo(Child);

export const Wrapper = styled.div`
  background-color: yellow;
  margin: 5px 0;
`;
