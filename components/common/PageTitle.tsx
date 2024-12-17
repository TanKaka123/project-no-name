import { Heading } from "@chakra-ui/react"

type PageTitleprops = {
    content: string
}

export const PageTitle = ({content}: PageTitleprops) =>{
    return (
        <Heading size={'lg'}>{content}</Heading>
    )
}