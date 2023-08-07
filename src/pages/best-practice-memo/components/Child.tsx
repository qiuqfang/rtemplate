import styled from "styled-components";

type ChildType = {
  value?: number;
  obj?: { a: number };
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Child: React.FC<ChildType> = (props) => {
  console.log(`子组件${props.value}`);

  return (
    <Wrapper>
      子组件{props.value}
      {JSON.stringify(props.obj)}
    </Wrapper>
  );
};

export default Child;

export const Wrapper = styled.div`
  margin: 5px 0;
`;
