import React from 'react';
import { useState, useEffect } from 'react';

export default function TicketPage() {
  const [tickets, setTickets] = useState<Array<{ id: number; destination: string; date: string }>>([]);

  useEffect(() => {
    // Simulate fetching ticket data
    const fetchedTickets = [
      { id: 1, destination: 'Paris, France', date: '2024-12-15' },
      { id: 2, destination: 'Tokyo, Japan', date: '2025-01-10' },
    ];
    setTickets(fetchedTickets);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets booked yet.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold">{ticket.destination}</h3>
              <p className="text-gray-600">Date: {ticket.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}