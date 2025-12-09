import { useState } from 'react'

type Comment = {
  id: number
  name: string
  email: string
  body: string
}

export default function UserTable() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Comment[] = await response.json()
      setComments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  const truncate = (text: string, max = 50) => {
    if (!text) return ''
    return text.length > max ? text.slice(0, max) + '...' : text
  }

  return (
    <div className="user-table-container">
      <button onClick={fetchComments} disabled={loading}>
        {loading ? 'Загрузка...' : 'Загрузить комментарии'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {comments.length > 0 && (
        <table
          border={1}
          style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}
        >
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Тело комментария</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{truncate(c.body, 50)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}