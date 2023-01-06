import { Button, Container, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const navigateMain = () => {
    navigate("/");
  };

  return (
    <Container
      color={"primary.100"}
      display="flex"
      flexDirection="column"
      h="100vh"
      justifyContent={"center"}
      centerContent
    >
      <Heading>잘못된 페이지 입니다.</Heading>
      <Button mt="30" colorScheme={"primary"} onClick={navigateMain}>
        메인 화면으로 이동
      </Button>
    </Container>
  );
};

export default NotFound;
