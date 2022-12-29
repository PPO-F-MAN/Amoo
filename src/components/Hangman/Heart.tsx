import styled from "@emotion/styled";
import { useAtomValue } from "jotai";

import { lifesAtom } from "../../atoms/hangman";

export const Heart = () => {
  const lifes = useAtomValue(lifesAtom);

  return (
    <Wrapper>
      <Contianer>
        {Array.from(new Array(lifes), () => "").map((key: string, index: number) => {
          return <Piece key={`${key}-${index}`} />;
        })}
      </Contianer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contianer = styled.div`
  position: relative;
  display: inline-block;
  width: 0;
  height: 200px;
`;

const Piece = styled.span`
  position: absolute;
  display: inline-block;
  box-sizing: border-box;
  width: 0px;
  height: 0px;
  margin-right: 10px;
  border-top: 60px solid #050505;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;

  &:nth-child(2n) {
    transform: rotate(-30deg);
  }

  &:nth-child(2n-1) {
    transform: rotate(30deg);
  }

  &:nth-child(14) {
    top: 0;
    left: -114px;
  }

  &:nth-child(13) {
    top: 0;
    left: -82px;
  }

  &:nth-child(12) {
    top: 0px;
    left: 14px;
  }

  &:nth-child(11) {
    top: 0;
    left: 46px;
  }

  &:nth-child(8) {
    top: 36px;
    left: -50px;
  }

  &:nth-child(7) {
    top: 36px;
    left: -146px;
  }

  &:nth-child(10) {
    top: 36px;
    left: 78px;
  }

  &:nth-child(9) {
    top: 36px;
    left: -18px;
  }

  &:nth-child(6) {
    top: 72px;
    left: -114px;
  }

  &:nth-child(5) {
    top: 72px;
    left: -82px;
  }

  &:nth-child(4) {
    top: 72px;
    left: 14px;
  }

  &:nth-child(3) {
    top: 72px;
    left: 46px;
  }

  &:nth-child(2) {
    top: 108px;
    left: -50px;
  }
  &:nth-child(1) {
    top: 108px;
    left: -18px;
  }
`;
