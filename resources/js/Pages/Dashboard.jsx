
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    const cards = [
        {
            title: 'Total Tickets',
            count: stats.total,
            description: 'All your tickets',
            color: 'border-gray-800',
            textColor: 'text-gray-900',
        },
        {
            title: 'Open',
            count: stats.open,
            description: 'Tickets waiting to be handled',
            color: 'border-blue-500',
            textColor: 'text-blue-600',
        },
        {
            title: 'In Progress',
            count: stats.in_progress,
            description: 'Tickets currently being handled',
            color: 'border-amber-500',
            textColor: 'text-amber-600',
        },
        {
            title: 'Closed',
            count: stats.closed,
            description: 'Completed tickets',
            color: 'border-green-500',
            textColor: 'text-green-600',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-900">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
                <div className="mx-auto w-full max-w-7xl">

                    {/* Welcome */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back!
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Here's an overview of your ticket management.
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {cards.map((card) => (
                            <div
                                key={card.title}
                                className={`rounded-xl border border-gray-200 border-l-4 ${card.color} bg-white p-6 shadow-sm transition hover:shadow-md`}
                            >
                                <p className="text-sm font-medium text-gray-500">
                                    {card.title}
                                </p>

                                <p className={`mt-3 text-4xl font-bold ${card.textColor}`}>
                                    {card.count}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Create a ticket or manage your existing tickets.
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={route('tickets.create')}
                                className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                + Create Ticket
                            </Link>

                            <Link
                                href={route('tickets.index')}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                View My Tickets
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
