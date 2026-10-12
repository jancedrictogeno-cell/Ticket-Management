
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, ticket }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
    });

    function submit(e) {
        e.preventDefault();
        put(route('tickets.update', ticket.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Edit Ticket
                </h2>
            }
        >
            <Head title="Edit Ticket" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="mb-6 text-sm text-gray-500">
                            Editing Ticket #{ticket.id}
                        </p>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="mb-2 block font-medium">
                                    Ticket Title
                                </label>

                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />

                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Description
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm"
                                    rows="5"
                                    required
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Status
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="open">Open</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="closed">Closed</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Ticket'}
                                </button>

                                <Link
                                    href={route('tickets.index')}
                                    className="text-gray-600 hover:underline"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
