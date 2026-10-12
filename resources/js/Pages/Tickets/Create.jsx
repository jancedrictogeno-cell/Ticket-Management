
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        status: 'open',
    });

    function submit(e) {
        e.preventDefault();

        post(route('tickets.store'), {
            onSuccess: () => {
                console.log('Ticket created successfully.');
            },
            onError: (errors) => {
                console.error('Ticket validation failed:', errors);
            },
            onFinish: () => {
                console.log('Ticket submission finished.');
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-900">
                    Create Ticket
                </h2>
            }
        >
            <Head title="Create Ticket" />

            <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
                <div className="mx-auto w-full max-w-2xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Create New Ticket
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Fill in the details below to create your ticket.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Ticket Title
                                </label>

                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
                                    placeholder="Enter ticket title"
                                    required
                                />

                                {errors.title && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows={5}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
                                    placeholder="Describe your issue..."
                                    required
                                />

                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="status"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Status
                                </label>

                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
                                >
                                    <option value="open">Open</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="closed">Closed</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            {Object.keys(errors).length > 0 && (
                                <div
                                    role="alert"
                                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                                >
                                    Hindi na-save ang ticket. Pakisuri ang mga error sa form sa itaas.
                                </div>
                            )}

                            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                                <Link
                                    href={route('tickets.index')}
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving Ticket...'
                                        : 'Create Ticket'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}