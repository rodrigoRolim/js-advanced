import { expect, test, describe, jest, beforeEach} from "@jest/globals"

describe('#RickAndMortyBRL', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('#getCharacters should be and adapter for RickAndMortyBRL.getCharactersJSON', async () => {
    const brlIntegration = jest.spyOn(
      RickAndMortyBRL,
      RickAndMortyBRL.getCharactersFromJSON.name
    ).mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharacters()
    expect(result).toEqual([])

    expect(brlIntegration).toHaveBeenCalled()
  })
})