import { useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { useToast } from "@chakra-ui/react";
import { fireAuthErrorToast } from "../../common/utils";

interface Props {
  error?: string | string[]
}

const Error: NextPage<Props> = ({ error }) => {
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    router.push({
      pathname: '/auth/signin',
      query: {
        error
      }
    })
  }, [error])

  return (
    <></>
  )
}

Error.getInitialProps = async ({ query }) => {
  const { error } = query

  return { error }
}

export default Error
