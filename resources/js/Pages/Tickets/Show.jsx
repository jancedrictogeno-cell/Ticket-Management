
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, ticket }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Ticket Details
                </h2>
            }
        >
            <Head title="Ticket Details" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Ticket #{ticket.id}
                                </p>

                                <h1 className="mt-1 text-2xl font-bold text-gray-900">
                                    {ticket.title}
                                </h1>
                            </div>

                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium capitalize text-indigo-700">
                                {ticket.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-2 font-semibold text-gray-800">
                                Description
                            </h3>

                            <p className="whitespace-pre-wrap text-gray-600">
                                {ticket.description}
                            </p>
                        </div>

                        <div className="mb-6 border-t pt-4 text-sm text-gray-500">
                            <p>
                                Created: {new Date(ticket.created_at).toLocaleString()}
                            </p>

                            <p className="mt-1">
                                Last updated: {new Date(ticket.updated_at).toLocaleString()}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={route('tickets.edit', ticket.id)}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                            >
                                Edit Ticket
                            </Link>

                            <Link
                                href={route('tickets.index')}
                                className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                Back to Tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
