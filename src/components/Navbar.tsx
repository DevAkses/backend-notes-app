import { Flex, Box, Heading, Link, Spacer, Button, useDisclosure, Collapse, IconButton, VStack, useMediaQuery } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const router = useRouter();

  const getLinkColor = (path: string) => {
    return router.pathname === path ? "yellow.300" : "white";
  };

  return (
    <Flex
      as="nav"
      padding="1.5rem"
      backgroundColor="teal.600"
      color="white"
      alignItems="center"
      boxShadow="md"
      justifyContent="space-between"
    >
      <Heading size="md" color="white">Notes App</Heading>
      
      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          variant="outline"
          colorScheme="whiteAlpha"
          borderColor="whiteAlpha.300"
        />
      </Box>

      <Box display={{ base: 'none', md: 'flex' }}>
        <NextLink href="/" passHref>
          <Link marginX="1rem" fontSize="lg" color={getLinkColor("/")} _hover={{ textDecoration: 'underline' }}>Home</Link>
        </NextLink>
        <NextLink href="/notes" passHref>
          <Link marginX="1rem" fontSize="lg" color={getLinkColor("/notes")} _hover={{ textDecoration: 'underline' }}>Notes</Link>
        </NextLink>
        <NextLink href="/add" passHref>
          <Link marginX="1rem" fontSize="lg" color={getLinkColor("/add")} _hover={{ textDecoration: 'underline' }}>Add Note</Link>
        </NextLink>
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <VStack
          spacing={4}
          align="stretch"
          display={{ base: 'block', md: 'none' }}
          marginTop="1rem"
          padding="1rem"
          backgroundColor="teal.700"
          borderRadius="md"
          boxShadow="md"
        >
          <NextLink href="/" passHref>
            <Button variant="link" width="full" color={getLinkColor("/")} _hover={{ bg: 'teal.600' }}>Home</Button>
          </NextLink>
          <NextLink href="/notes" passHref>
            <Button variant="link" width="full" color={getLinkColor("/notes")} _hover={{ bg: 'teal.600' }}>Notes</Button>
          </NextLink>
          <NextLink href="/add" passHref>
            <Button variant="link" width="full" color={getLinkColor("/add")} _hover={{ bg: 'teal.600' }}>Add Note</Button>
          </NextLink>
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default Navbar;
