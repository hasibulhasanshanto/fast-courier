/**
 * Simple loading placeholder used while lazy‑loaded route children are being fetched.
 * Mirrors the component that lived inside `withLayout`.
 */
export default function RouteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      Loading...
    </div>
  );
}
