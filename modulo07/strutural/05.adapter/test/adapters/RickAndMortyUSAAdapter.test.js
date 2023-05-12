import { expect, test, describe, jest, beforeEach} from "@jest/globals"

describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('#getCharacters should be and adapter for RickAndMortyUSA.getCharactersJSON', async () => {
    const brlIntegration = jest.spyOn(
      RickAndMortyBRL,
      RickAndMortyBRL.getCharactersFromXML.name
    ).mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(result).toEqual([])

    expect(brlIntegration).toHaveBeenCalled()
  })
})