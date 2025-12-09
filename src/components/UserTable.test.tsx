import { render, screen, fireEvent } from '@testing-library/react'
import { vi, afterEach, describe, it, expect } from 'vitest'
import UserTable from './UserTable'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('UserTable', () => {
  it('fetches and displays users after clicking the load button', async () => {
    const mockedUsers = [
      {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
      },
    ]

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(mockedUsers) } as any)
    ))

    render(<UserTable />)

    const loadButton = screen.getByRole('button', { name: /загрузить пользователей/i })
    fireEvent.click(loadButton)

    const userName = await screen.findByText('Leanne Graham')
    expect(userName).toBeTruthy()
    expect((global as any).fetch).toHaveBeenCalled()
  })
})