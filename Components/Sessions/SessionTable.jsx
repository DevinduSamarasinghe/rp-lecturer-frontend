'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDuration } from '@/lib/format_utils/format_duration'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/Components/ui/table' // import shadcn's table components
import { Button } from '@/Components/ui/button' // for pagination buttons
import crypto from 'crypto' // For hashingconst SessionTable = ({user_email})=>{
    


// Function to hash and shorten the session ID for display
const hashAndShortenSessionID = (sessionId) => {
    const hash = crypto.createHash('md5').update(sessionId).digest('hex') // Generate MD5 hash
    return hash.slice(0, 8) // Return first 8 characters of the hash
  }

const SessionTable = ({user_email})=>{

    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const PAGE_SIZE = 8

    useEffect(()=>{
        const fetchSessions = async()=>{
            try {
                const response = await fetch(`/api/server/sessions?user_email=${user_email}`)

                if(!response.ok) {
                    throw new Error('Error fetching sessions')
                }

                const data = await response.json()
                setSessions(data)
                setLoading(false)
            }catch(error){
                console.error('Error fetching sessions', error)
                setError(error.message)
                setLoading(false)
            }
        }
        fetchSessions()
    },[])

    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    const paginatedSessions = sessions.slice(startIndex, endIndex)

    if (loading)
        return <div className='text-center mt-10 text-xl ml-10'>Loading sessions...</div>
      if (error)
        return <div className='text-center mt-10 text-red-500'>Error: {error}</div>
    
      const handleNextPage = () => {
        if (currentPage < Math.ceil(sessions.length / PAGE_SIZE)) {
          setCurrentPage(currentPage + 1)
        }
      }
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
        }
      }

    return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Sessions</h1>

      {/* Table starts here */}
      <div className='shadow-md rounded-lg overflow-x-auto my-10'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Session ID</TableHead>
              <TableHead>Session Start Time</TableHead>
              <TableHead>Session End Time</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSessions.map(session => (
              <TableRow key={session.session_id}>
                <TableCell>
                  {/* Pass the original session_id in the URL but show the hashed version */}
                  <Link href={`/sessions/${session.session_id}`} passHref>

                    EV - {hashAndShortenSessionID(session.session_id)}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(session.session_start_time).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(session.session_end_time).toLocaleString()}
                </TableCell>
                <TableCell>
                  {formatDuration(session.session_duration)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className='flex justify-between mt-6'>
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className='mr-2'
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {Math.ceil(sessions.length / PAGE_SIZE)}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(sessions.length / PAGE_SIZE)}
          className='ml-2'
        >
          Next
        </Button>
      </div>
    </div>
    )
}

export default SessionTable