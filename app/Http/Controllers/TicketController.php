<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $query = auth()->user()->tickets()->latest();
    
        // Search by ticket title
        if ($request->filled('search')) {
            $search = $request->input('search');
    
            $query->where('title', 'like', '%' . $search . '%');
        }
    
        // Filter by status
        if (
            $request->filled('status') &&
            in_array($request->status, ['open', 'in_progress', 'closed'])
        ) {
            $query->where('status', $request->status);
        }
    
        $tickets = $query->get();
    
        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', ''),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:open,in_progress,closed',
        ]);

        auth()->user()->tickets()->create($validated);

        return redirect()
            ->route('tickets.index')
            ->with('success', 'Ticket created successfully.');
    }

    public function show(Ticket $ticket)
    {
        $ticket = auth()->user()
            ->tickets()
            ->findOrFail($ticket->id);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function edit(Ticket $ticket)
    {
        $ticket = auth()->user()
            ->tickets()
            ->findOrFail($ticket->id);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
        ]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $ticket = auth()->user()
            ->tickets()
            ->findOrFail($ticket->id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:open,in_progress,closed',
        ]);

        $ticket->update($validated);

        return redirect()
            ->route('tickets.index')
            ->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket = auth()->user()
            ->tickets()
            ->findOrFail($ticket->id);

        $ticket->delete();

        return redirect()
            ->route('tickets.index')
            ->with('success', 'Ticket deleted successfully.');
    }
}
