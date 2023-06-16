import { memo } from "react";
import styled from "styled-components";

type ChildType = {
  value?: number;
  obj?: { a: number };
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Child: React.FC<ChildType> = (props = { value: 1, obj: { a: 1 }, onClick: () => void 0 }) => {
  console.log(`子组件${props.value}`);

  return (
    <Wrapper>
      子组件{props.value}
      {JSON.stringify(props.obj)}
    </Wrapper>
  );
};

export default memo(Child, areEqual);

export const Wrapper = styled.div`
  background-color: yellow;
  margin: 5px 0;
`;

function areEqual(prevProps: ChildType, nextProps: ChildType) {
  return (
    JSON.stringify(prevProps.value) === JSON.stringify(nextProps.value) &&
    JSON.stringify(prevProps.obj) === JSON.stringify(nextProps.obj) &&
    JSON.stringify(prevProps.onClick) === JSON.stringify(nextProps.onClick)
  );
}
