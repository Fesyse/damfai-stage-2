class SummarizeService {
  private BASE_URL = "/summarize"

  summarize(text: string, level: string) {
    return Promise.resolve({
      text: "aasdpkasdgfp"
    })
  }
}

export const summarizeService = new SummarizeService()
