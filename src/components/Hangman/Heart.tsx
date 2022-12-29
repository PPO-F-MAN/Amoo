import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";

import { lifesAtom } from "../../atoms/hangman";
import { LIFES, Primary } from "../../constants";

export type PrimaryColorType = keyof typeof Primary;

export const Heart = () => {
  const lifes = useAtomValue(lifesAtom);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box mt="50px" pos="relative" display="inline-block" w="0" h="200px">
        <AnimatePresence>
          {Array.from(new Array(lifes), () => "").map((key: string, index: number) => {
            const bgColor = (Math.trunc((LIFES - lifes) / 2) + 1) * 100;
            return (
              <Piece
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 1,
                    type: "tween",
                  },
                }}
                bgColor={bgColor as PrimaryColorType}
                key={`${key}-${index}`}
              />
            );
          })}
        </AnimatePresence>
      </Box>
    </Flex>
  );
};

const Piece = styled(motion.span)`
  position: absolute;
  display: inline-block;
  box-sizing: border-box;
  width: 0px;
  height: 0px;
  margin-right: 10px;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;

  &:nth-of-type(14) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 700) as PrimaryColorType]};
    transform: rotate(30deg);
    top: 34.5px;
    left: -138px;
  }

  &:nth-of-type(13) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 600) as PrimaryColorType]};
    transform: rotate(-30deg);
    top: 0;
    left: -108px;
  }

  &:nth-of-type(12) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 600) as PrimaryColorType]};
    transform: rotate(-30deg);
    top: 70px;
    left: -108px;
  }

  &:nth-of-type(11) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 500) as PrimaryColorType]};
    transform: rotate(30deg);
    top: 0;
    left: -78px;
  }

  &:nth-of-type(10) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 500) as PrimaryColorType]};
    transform: rotate(30deg);
    top: 70px;
    left: -78px;
  }

  &:nth-of-type(9) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 400) as PrimaryColorType]};
    transform: rotate(-30deg);
    top: 34.5px;
    left: -48px;
  }

  &:nth-of-type(8) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 400) as PrimaryColorType]};
    transform: rotate(-30deg);
    top: 0px;
    left: 12px;
  }

  &:nth-of-type(7) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 300) as PrimaryColorType]};
    transform: rotate(-30deg);
    top: 34.5px;
    left: 72px;
  }

  &:nth-of-type(6) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 200) as PrimaryColorType]};
    transform: rotate(30deg);
    top: 0;
    left: 42px;
  }

  &:nth-of-type(5) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 200) as PrimaryColorType]};
    transform: rotate(30deg);
    top: 34.5px;
    left: -18px;
  }

  &:nth-of-type(4) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 200) as PrimaryColorType]};
    transform: rotate(30deg);
    top: 70px;
    left: 42px;
  }

  &:nth-of-type(3) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 100) as PrimaryColorType]};
    transform: rotate(-30deg);
    top: 70px;
    left: 12px;
  }

  &:nth-of-type(2) {
    border-top: 61px solid
      ${({ bgColor }: { bgColor: PrimaryColorType }) =>
        Primary[(bgColor + 100) as PrimaryColorType]};
    transform: rotate(-30deg);
    top: 105px;
    left: -48px;
  }

  &:nth-of-type(1) {
    border-top: 61px solid ${({ bgColor }: { bgColor: PrimaryColorType }) => Primary[bgColor]};
    transform: rotate(30deg);
    top: 105px;
    left: -18px;
  }
`;
