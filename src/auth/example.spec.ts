class NumberList {
  list: number[] = []

  addNumber(x: number) {
    this.list.push(x)
    this.notifyListeners(x)
  }

  notifyListeners(x: number) {
    /// kfjdkjf
  }
}

describe('NumberList', () => {
  it('addNumber', () => {
    const nl = new NumberList()
    expect(nl.list.length).toEqual(0)
    nl.notifyListeners = jest.fn() //mock
    const num = 9
    nl.addNumber(num)
    expect(nl.list.length).toEqual(1)
    expect(nl.notifyListeners).toHaveBeenCalled()
    expect(nl.notifyListeners).toBeCalledTimes(1)
    expect(nl.notifyListeners).toBeCalledWith(num)
  })
})