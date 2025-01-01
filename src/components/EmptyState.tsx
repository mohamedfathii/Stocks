interface EmptyStateProps {
  searchQuery?: string;
}

export const EmptyState = ({ searchQuery }: EmptyStateProps) => (
  <div className="p-8 text-center">
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No stocks found</h3>
    <p className="mt-1 text-sm text-gray-500">
      {searchQuery ? `No results for "${searchQuery}"` : 'Type to search stocks'}
    </p>
  </div>
);
