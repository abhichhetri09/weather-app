interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div className="w-full max-w-xl rounded-2xl border border-red-700/80 bg-red-900/40 px-4 py-3 text-sm text-red-100 shadow-lg shadow-red-950/40">
      {message}
    </div>
  );
};

export { ErrorMessage };

