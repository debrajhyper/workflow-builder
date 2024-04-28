import { Link } from "react-router-dom";

export function NoMatchFound() {
    return (
        <section className="flex items-center h-screen p-16">
            <div className="container flex flex-col items-center ">
                <div className="flex flex-col gap-6 max-w-md text-center">
                    <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl md:text-3xl dark:text-gray-300">
                        Sorry, we couldn't find this page.
                    </p>

                    <Link
                        to="/"
                        className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </section>
    );
}