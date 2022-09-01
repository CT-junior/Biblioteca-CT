import { useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Button, Center, Code, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { fireAuthErrorToast } from "../../common/utils";

interface Props {
  error?: string | string[]
}

const Error: NextPage<Props> = ({ error }) => {
  const router = useRouter()
  const toast = useToast()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (error && error === 'AccessDenied') {
      fireAuthErrorToast(toast, {
        description: (
          <Text>
            O email não é do domínio da <Text as={'strong'}>CT Junior</Text>
          </Text>
        )
      })
      router.push('/auth/signin')
    }
    else {
      setLoading(false)
    }
  }, [error])

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <Center h="100vh" flexDirection="column" bg="red.200">
      <Flex p="8" flexDirection="column" gap={8} bg="white" rounded="lg">
        <Heading>Erro</Heading>
        <Text>
          Um problema inesperado ocorreu, por favor reporte ao responsável e tente novamente.
        </Text>
        <Text>
          next-auth pages error pages error code: <Code>{error}</Code>
        </Text>
        <Button
          onClick={() => router.push('/auth/signin')}
        >
          Tentar novamente
        </Button>
      </Flex>
    </Center>
  )
}

Error.getInitialProps = async ({ query }) => {
  const { error } = query

  return { error }
}

export default Error

