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
          return <Piece border={Primary[300]} key={`${key}-${index}`} />;
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

  &:nth-of-type(14) {
    transform: rotate(30deg);
    top: 36px;
    left: -146px;
  }

  &:nth-of-type(13) {
    transform: rotate(-30deg);
    top: 0;
    left: -114px;
  }

  &:nth-of-type(12) {
    transform: rotate(-30deg);
    top: 72px;
    left: -114px;
  }

  &:nth-of-type(11) {
    transform: rotate(30deg);
    top: 0;
    left: -82px;
  }

  &:nth-of-type(10) {
    transform: rotate(30deg);
    top: 72px;
    left: -82px;
  }

  &:nth-of-type(9) {
    transform: rotate(-30deg);
    top: 36px;
    left: -50px;
  }

  &:nth-of-type(8) {
    transform: rotate(-30deg);
    top: 0px;
    left: 14px;
  }

  &:nth-of-type(7) {
    transform: rotate(-30deg);
    top: 36px;
    left: 78px;
  }

  &:nth-of-type(6) {
    transform: rotate(30deg);
    top: 0;
    left: 46px;
  }

  &:nth-of-type(5) {
    transform: rotate(30deg);
    top: 36px;
    left: -18px;
  }

  &:nth-of-type(4) {
    transform: rotate(30deg);
    top: 72px;
    left: 46px;
  }

  &:nth-of-type(3) {
    transform: rotate(-30deg);
    top: 72px;
    left: 14px;
  }

  &:nth-of-type(2) {
    transform: rotate(-30deg);
    top: 108px;
    left: -50px;
  }

  &:nth-of-type(1) {
    transform: rotate(30deg);
    top: 108px;
    left: -18px;
  }
`;
