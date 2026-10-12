import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, tickets }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-900">
                    My Tickets
                </h2>
            }
        >
            <Head title="My Tickets" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Ticket Management
                        </h1>

                        <Link
                            href={route('tickets.create')}
                            className="inline-flex items-center rounded-md bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        >
                            + Create Ticket
                        </Link>
                    </div>

                    {/* Tickets Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                        {tickets.length === 0 ? (
                            <p className="p-6 text-gray-600">
                                No tickets yet. Create your first ticket!
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-sm font-bold text-gray-900">
                                                Title
                                            </th>
                                            <th className="px-6 py-4 text-sm font-bold text-gray-900">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-sm font-bold text-gray-900">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {tickets.map((ticket) => (
                                            <tr
                                                key={ticket.id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {ticket.title}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium capitalize text-gray-800">
                                                        {ticket.status.replace('_', ' ')}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <Link
                                                            href={route('tickets.show', ticket.id)}
                                                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            href={route('tickets.edit', ticket.id)}
                                                            className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (confirm('Delete this ticket?')) {
                                                                    router.delete(
                                                                        route('tickets.destroy', ticket.id)
                                                                    );
                                                                }
                                                            }}
                                                            className="font-medium text-red-600 hover:text-red-800 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}   