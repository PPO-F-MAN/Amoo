import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useAtomValue } from "jotai";

import { lifesAtom } from "../../atoms/hangman";
import { Primary } from "../../constants";

export const Heart = () => {
  const lifes = useAtomValue(lifesAtom);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Contianer>
        {Array.from(new Array(lifes), () => "").map((key: string, index: number) => {
          return <Piece border={Primary[400]} key={`${key}-${index}`} />;
        })}
      </Contianer>
    </Flex>
  );
};

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
  border-top: 60px solid ${({ border }: { border: string }) => border};
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;

  &:nth-of-type(2n) {
    transform: rotate(-30deg);
  }

  &:nth-of-type(2n-1) {
    transform: rotate(30deg);
  }

  &:nth-of-type(14) {
    top: 0;
    left: -114px;
  }

  &:nth-of-type(13) {
    top: 0;
    left: -82px;
  }

  &:nth-of-type(12) {
    top: 0px;
    left: 14px;
  }

  &:nth-of-type(11) {
    top: 0;
    left: 46px;
  }

  &:nth-of-type(8) {
    top: 36px;
    left: -50px;
  }

  &:nth-of-type(7) {
    top: 36px;
    left: -146px;
  }

  &:nth-of-type(10) {
    top: 36px;
    left: 78px;
  }

  &:nth-of-type(9) {
    top: 36px;
    left: -18px;
  }

  &:nth-of-type(6) {
    top: 72px;
    left: -114px;
  }

  &:nth-of-type(5) {
    top: 72px;
    left: -82px;
  }

  &:nth-of-type(4) {
    top: 72px;
    left: 14px;
  }

  &:nth-of-type(3) {
    top: 72px;
    left: 46px;
  }

  &:nth-of-type(2) {
    top: 108px;
    left: -50px;
  }
  &:nth-of-type(1) {
    top: 108px;
    left: -18px;
  }
`;
