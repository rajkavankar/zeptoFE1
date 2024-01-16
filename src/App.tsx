import { Input } from "./components"
import { users } from "./data/Users"

const App = () => {
  return (
    <div className='h-screen bg-slate-100 text-center pt-10'>
      <h1 className='text-blue-600 text-4xl mb-5'>Pick Users</h1>

      <Input className='' placeholder='Add a user' values={users} />
    </div>
  )
}

export default App
