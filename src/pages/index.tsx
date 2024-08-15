import { NextPage } from 'next';
import { Box, Heading, Text, Button, Stack, Center, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="4"
      bgGradient="linear(to-r, teal.500, blue.500)"
      color="white"
    >
      <Stack spacing={6} textAlign="center">
        <Heading as="h1" size={useBreakpointValue({ base: 'xl', md: '2xl', lg: '3xl' })}>
          Welcome to the Notes App
        </Heading>
        <Text fontSize={useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' })}>
          Manage your notes with ease. Explore and organize your notes effectively.
        </Text>
        <Stack spacing={4} direction={{ base: 'column', sm: 'row' }} justify="center">
          <Link href="/notes" passHref>
            <Button
              as="a"
              colorScheme="teal"
              size="lg"
              variant="solid"
              width={{ base: 'full', sm: 'auto' }}
            >
              View Notes
            </Button>
          </Link>
          <Link href="/add" passHref>
            <Button
              as="a"
              colorScheme="blue"
              size="lg"
              variant="solid"
              width={{ base: 'full', sm: 'auto' }}
            >
              Add New Note
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HomePage;
