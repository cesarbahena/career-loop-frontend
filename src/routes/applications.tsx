import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { getJobApplications } from '../lib/server-functions'
import type { JobApplication } from '../lib/schema'

export const Route = createFileRoute('/applications')({
  loader: async () => {
    const applications = await getJobApplications()
    return { applications }
  },
  component: Applications,
})

const statusColors = {
  saved: 'bg-gray-100 text-gray-800',
  applied: 'bg-blue-100 text-blue-800',
  interviewing: 'bg-yellow-100 text-yellow-800',
  offer_received: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  archived: 'bg-gray-100 text-gray-600',
}

function Applications() {
  const { applications } = Route.useLoaderData()
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleAddNew = () => {
    setIsAddingNew(true)
  }

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <Button onClick={handleAddNew}>
          Add New Application
        </Button>
      </div>
      
      {applications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No job applications yet</p>
          <Button onClick={handleAddNew}>Add your first application</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {app.jobTitle}
                  </h3>
                  <p className="text-gray-600">{app.companyName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                  {app.status.replace('_', ' ')}
                </span>
              </div>
              
              {app.jobUrl && (
                <a 
                  href={app.jobUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm mb-2 block"
                >
                  View Job Posting →
                </a>
              )}
              
              {app.notes && (
                <p className="text-gray-700 text-sm mb-2">{app.notes}</p>
              )}
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Added: {formatDate(app.createdAt)}</span>
                {app.appliedAt && (
                  <span>Applied: {formatDate(app.appliedAt)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isAddingNew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Job Application</h2>
            <p className="text-gray-600">Form coming soon...</p>
            <Button 
              onClick={() => setIsAddingNew(false)}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
