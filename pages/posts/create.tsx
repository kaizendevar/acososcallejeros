import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";

export default function Create() {
  const { user } = useUser();
  const [isPublished, setIsPublished] = useState(false);
  const [id, setId] = useState("");

  const createPost = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      calle: event.target.calle.value,
      altura: event.target.altura.value,
      descripcion: event.target.descripcion.value,
    });

    try {
      const res = await fetch("/api/posts", {
        body,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { id } = await res.json();
      setIsPublished(true);
      setId(id);
    } catch (err) {
      console.error("ERROR!", err);
      setIsPublished(false);
    }

    // result.user => 'Ada Lovelace'
  };

  return (
    <>
      <Head>
        <title>Publica un acoso</title>
      </Head>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} align={"center"}>
              Publicación de Acoso Callejero
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"} align={"center"} pt={4}>
              <Text as={"span"} color={"green.600"} fontWeight="bold">
                {user?.given_name}
              </Text>
              , brinda información al respecto.
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            {!isPublished ? (
              <form onSubmit={createPost}>
                <Stack spacing={4}>
                  <FormControl id="calle">
                    <FormLabel>Calle</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl id="altura">
                    <FormLabel>Altura</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl id="descripcion">
                    <FormLabel>Descripcion</FormLabel>
                    <Textarea
                      size="md"
                      rows={6}
                      placeholder="Brinda información al respecto"
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Publicar
                    </Button>
                  </Stack>
                </Stack>
              </form>
            ) : (
              <Alert status="success">
                <AlertIcon />
                <Text>Publicación creada con éxito.</Text>
                <Link href={`./${id}`}>
                  <Text color="teal.500" ml={1}>
                    Ver publicación
                  </Text>
                </Link>
              </Alert>
            )}
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
