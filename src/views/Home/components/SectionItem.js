import React from "react";
import styled from "styled-components";

const SectionItemWrapper = styled.div`
  display: inline-block;
  width: 240px;
  height: 140px;
  margin: 0 6px;
  flex-shrink: 0;

  cursor: pointer;

  margin-left: ${(props) => (props.first ? "80px" : "6px")};
  background-color: #fff;
`;

const SectionItem = (props) => {
  const { item, first, onClick } = props;
  const { title, lastEdited, image } = item;

  return (
    <SectionItemWrapper first={first} onClick={onClick}>
      {title} <br />
      {lastEdited} <br />
      {image} <br />
    </SectionItemWrapper>
  );
};

export default SectionItem;
export { SectionItemWrapper };