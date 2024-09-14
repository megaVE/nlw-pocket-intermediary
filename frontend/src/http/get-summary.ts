import type { SummaryResponse } from "../@types/summary-response"

export const getSummary = async (): Promise<SummaryResponse> => {
    const res = await fetch('http://localhost:3333/summary')
    const data = await res.json()

    return data.summary
}
