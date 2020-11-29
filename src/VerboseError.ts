interface VerboseError {
  where: string
  messages: string[]
  code: number
  status: number
}

export default VerboseError;