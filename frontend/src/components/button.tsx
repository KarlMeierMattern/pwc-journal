export const Button = ({
  disabled,
  isPending,
  children,
}: {
  disabled: boolean;
  isPending: boolean;
  children: React.ReactNode | string;
}) => {
  return (
    <button
      disabled={disabled}
      className="mt-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white text-lg font-semibold py-3 rounded-lg transition-colors cursor-pointer"
    >
      {isPending ? children : children}
    </button>
  );
};
