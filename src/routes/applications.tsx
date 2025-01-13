import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/applications')({
  component: Applications,
})

function Applications() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Job Applications</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Here you can view and manage all your job applications.
      </p>
      {/* TODO: Implement job applications list and management */}
    </div>
  )
}
