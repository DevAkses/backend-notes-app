import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <header>
                    <h1>Notes App</h1>
                </header>
                <main>{children}</main>
            </body>
        </html>
    );
}
